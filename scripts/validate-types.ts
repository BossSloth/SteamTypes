import ChromeRemoteInterface from 'chrome-remote-interface';
import fs from 'fs';

async function getSharedJsContextTarget(): Promise<string | undefined> {
    console.log('Connecting to CEF instance on port 8080...');
        
    // Connect to the Chrome DevTools Protocol endpoint
    let client: ChromeRemoteInterface.Client;
    try {
        client = await ChromeRemoteInterface({
            port: 8080,
        });
    } catch (error) {
        console.error('Unable to connect to Steam on port 8080. Are you sure Steam is running and CEF is enabled?\n', error);
        return undefined;
    }

    const { Target } = client;

    // Get all targets (windows/tabs)
    const targets = await Target.getTargets();
    
    // Find the target with title 'SharedJsContext'
    const sharedJsContextTarget = targets.targetInfos.find(target => 
        target.title === 'SharedJSContext'
    );
    
    if (!sharedJsContextTarget) {
        console.error('Could not find window with title "SharedJSContext"');
        await client.close();
        return undefined;
    }

    client.close();

    return sharedJsContextTarget.targetId;
}

async function main() {
    try {
        const sharedJsContextTarget = await getSharedJsContextTarget();
        if (!sharedJsContextTarget) {
            return;
        }
        
        console.log(`Found SharedJSContext window ${sharedJsContextTarget}, attaching to it...`);

        const client = await ChromeRemoteInterface({
            port: 8080,
            target: sharedJsContextTarget,
        });
        
        // Extract domains we need
        const { Runtime } = client;
        
        // Enable the Runtime and Page domains
        await Promise.all([
            Runtime.enable(),
        ]);

        // Read the content of inject.js file
        const injectJsContent = fs.readFileSync('./scripts/inject.js', 'utf8');
        
        // Execute the content of inject.js in the context of the target
        await Runtime.evaluate({
            expression: injectJsContent,
        });
        
        console.log('Successfully injected and executed inject.js in SharedJsContext');

        
        // Execute console.log('test') in the context of the target
        let response = await Runtime.evaluate({
            expression: "window.convertToTypeScript(SteamClient.User, 'User')",
            returnByValue: true,
        });

        if (response.exceptionDetails) {
            await client.close();
            throw response.exceptionDetails.exception
        }
        
        console.log('Successfully executed console.log("test") in SharedJsContext');
        
        console.log(response.result.value);
        
        // Clean up
        // await Target.detachFromTarget({ sessionId: sessionId.sessionId });
        await client.close();
        
    } catch (error) {
        console.error('Error:', error);
    }
}

main();