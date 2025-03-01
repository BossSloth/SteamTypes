type Map = {
    object: string, // The SharedJs object so like `SteamClient.Apps`
    file: string, // Path to the file relative to src/types
    name: string, // Name of the interface
}

export const interfaceMaps: Map[] = [
    { object: 'SteamClient.User', file: 'SteamClient/User', name: 'User' },
    { object: 'SteamClient.Apps', file: 'SteamClient/Apps', name: 'Apps' },
    { object: 'SteamClient.Auth', file: 'SteamClient/Auth', name: 'Auth' },
]