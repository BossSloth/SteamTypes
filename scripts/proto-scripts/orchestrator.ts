import chalk from 'chalk';
import { existsSync, mkdirSync, statSync, writeFileSync } from 'fs';
import path, { join } from 'path';
import { createProtoRoot } from './proto-root';
import { generateTypeScriptFromReflection } from './reflection-to-ts';

const ROOT_DIR = path.resolve(`${__dirname}/../../`);
const DEFAULT_PROTO_DIR = join(ROOT_DIR, 'scripts', 'Protobufs');
const DEFAULT_OUTPUT_DIR = join(ROOT_DIR, 'src', 'types', 'Protobufs', 'steam');

const STEAM_PROTOBUF_FILES = [
  'webuimessages_gamerecording.proto',
  'webuimessages_gamerecordingfiles.proto',
  'steammessages_gamerecording_objects.proto',
  'steammessages_base.proto',
  'steammessages_player.steamclient.proto',
  'enums.proto',
  'steammessages_appoverview.proto',
  'steammessages_client_objects.proto',
  'steammessages_clientsettings.proto',
  'steammessages_store.steamclient.proto',
  'contenthubs.proto',
  'steammessages_storebrowse.steamclient.proto',
  'enums_productinfo.proto',
  'steammessages_chat.steamclient.proto',
  'steammessages_clientserver_friends.proto',
  'steamnetworkingsockets_messages.proto',
  'steamdatagram_messages_sdr.proto',
  'steammessages_gamenetworkingui.proto',
  'steamnetworkingsockets_messages_certs.proto',
  'steammessages_clientnotificationtypes.proto',
];

const DEFAULT_PROTOBUF_FILES = [...STEAM_PROTOBUF_FILES.map(file => join('steam', file))];

export interface GenerateConfig {
  protoDir?: string;
  outputDir?: string;
  files?: string[];
  silent?: boolean;
}

export function generateTypeScriptDefinitions(config: GenerateConfig = {}): void {
  const protoDir = config.protoDir ?? DEFAULT_PROTO_DIR;
  const outputDir = config.outputDir ?? DEFAULT_OUTPUT_DIR;
  const files = config.files ?? DEFAULT_PROTOBUF_FILES;
  const silent = config.silent ?? false;

  function log(message: string): void {
    if (!silent) console.log(message);
  }

  function errLog(message: string): void {
    if (!silent) console.error(message);
  }

  // Display a nice header
  log('');
  log(chalk.magenta.bold('╔══════════════════════════════════════════════════════╗'));
  log(chalk.magenta.bold('║            Steam Types Protobuf Generator            ║'));
  log(chalk.magenta.bold('╚══════════════════════════════════════════════════════╝'));
  log('');

  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
    log(chalk.cyan(`📁 Created output directory: ${outputDir}`));
    log('');
  }

  const startTime = performance.now();

  try {
    log(chalk.blue.bold('🔍 Generating TypeScript definitions...'));
    log(chalk.gray(`Processing ${files.length} protobuf files...`));
    log('');

    let processedCount = 0;
    let totalSizeKB = 0;
    for (const protoFile of files) {
      const protoPath = join(protoDir, protoFile);
      const root = createProtoRoot(protoDir);

      root.loadSync(protoPath, { keepCase: true });

      const outputFileName = path.basename(protoFile).replace('.proto', '.ts');
      const outputFilePath = join(outputDir, outputFileName);
      const tsDefinitions = generateTypeScriptFromReflection(root, protoFile, outputFilePath);

      writeFileSync(outputFilePath, tsDefinitions, 'utf-8');

      // Get file size for display
      const stats = statSync(outputFilePath);
      const fileSizeKB = stats.size / 1024;
      totalSizeKB += fileSizeKB;

      const progressPadding = files.length.toString().length;

      processedCount++;
      const progress = chalk.yellow(`[${processedCount.toString().padStart(progressPadding, ' ')}/${files.length.toString().padStart(progressPadding, ' ')}]`);
      log(chalk.green(`📦 ${progress} Generated: ${chalk.white(outputFileName)} ${chalk.gray(`(${fileSizeKB.toFixed(1)} KB)`)}`));
    }

    log('');
    log(chalk.green.bold('✅ TypeScript definitions generated successfully!'));
    log(chalk.gray(`📊 Processed ${processedCount} files in ${chalk.cyan(path.basename(outputDir))} directory`));
    log(chalk.gray(`📏 Total output size: ${chalk.yellow(totalSizeKB.toFixed(1))} KB`));
  } catch (error) {
    errLog('');
    errLog(chalk.red.bold('❌ Failed to generate TypeScript definitions:'));
    errLog(chalk.red(`   ${error as Error}`));
    throw error;
  } finally {
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);
    log(chalk.cyan(`⏱️  Completed in ${duration}ms`));
    log('');
  }
}
