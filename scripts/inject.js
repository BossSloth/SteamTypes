function convertToTypeScript(obj, name = null) {
    let outputLines = {};

    const jsonMap = mapFunctions(obj);
    const sortedJsonMap = sortMapRecursively(jsonMap);

    generateTypeScriptInterfaces(sortedJsonMap, name || Object.getOwnPropertyNames(window).filter(name => window[name] === obj)[0], outputLines);
    return outputLines["data"];
}

function mapFunctions(obj) {
    const methods = {};
    for (const key in obj) {
        if (typeof obj[key] === 'function') {
            methods[key] = true;  // Mark the presence of a function
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            methods[key] = mapFunctions(obj[key]);  // Recursively call self function on the nested object
        }
    }
    return methods;
}

function generateTypeScriptInterfaces(jsonMap, interfaceName, outputLines) {
    const methods = {};

    for (const [key, value] of Object.entries(jsonMap)) {
        if (typeof value === 'boolean') {
            methods[key] = null;
        } else if (typeof value === 'object') {
            // Recursively sort and process nested objects
            const nestedMap = sortMapRecursively(value);
            methods[key] = key;
            generateTypeScriptInterfaces(nestedMap, key, outputLines);
        }
    }

    let stringBuilder = `export interface ${interfaceName} {\n`;

    for (const [key, value] of Object.entries(methods)) {
        if (value === null) {
            stringBuilder += `  ${key}: any;\n`;
        } else {
            stringBuilder += `  ${key}: ${value};\n`;
        }
    }
    stringBuilder += "}\n";
    if(!outputLines["data"])
        outputLines["data"] = "";
    outputLines["data"] += stringBuilder + "\n";
}

function sortMapRecursively(map) {
    const sortedMap = {};

    // Sort the keys alphabetically
    const sortedKeys = Object.keys(map).sort();
    for (const key of sortedKeys) {
        const value = map[key];

        if (typeof value === 'object') {
            // Recursively sort nested objects
            sortedMap[key] = sortMapRecursively(value);
        } else {
            sortedMap[key] = value;
        }
    }

    return sortedMap;
}