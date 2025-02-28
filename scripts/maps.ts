type Map = {
    value: string, // The SharedJs value so like SteamClient.Apps
    file: string, // Path to the file relative to src/types
}

export const maps: Map[] = [
    { value: 'SteamClient.User', file: 'SteamClient/User' },
]