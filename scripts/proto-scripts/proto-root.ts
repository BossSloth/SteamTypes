import { existsSync } from 'fs';
import path from 'path';
import protobuf from 'protobufjs';

export function createProtoRoot(protoDir: string): protobuf.Root {
  const root = new protobuf.Root();
  root.resolvePath = (origin: string, target: string): string => {
    if (path.isAbsolute(target)) {
      return target;
    }
    const relativePath = path.join(path.dirname(origin), target);
    if (existsSync(relativePath)) {
      return relativePath;
    }

    return path.join(protoDir, target);
  };

  return root;
}
