interface Map {
    /** Path to the file relative to src/types */
    file: string,
    /** The SharedJs object so like `SteamClient.Apps` */
    object: string,
    /** Name of the interface in the source file */
    srcName: string,
}

export const interfaceMaps: Map[] = [
    // { object: 'SteamClient.Apps', file: 'SteamClient/Apps', srcName: 'Apps' }, //TODO: Apps doesn't work it crashes on some comment lines
    { file: 'SteamClient/Auth', object: 'SteamClient.Auth', srcName: 'Auth' },
    { file: 'SteamClient/Auth', object: 'await SteamClient.Auth.GetRefreshInfo()', srcName: 'AuthRefreshInfo' },
    { file: 'SteamClient/Broadcast', object: 'SteamClient.Broadcast', srcName: 'Broadcast' },
    { file: 'SteamClient/Browser', object: 'SteamClient.Browser', srcName: 'Browser' },
    { file: 'SteamClient/ClientNotifications', object: 'SteamClient.ClientNotifications', srcName: 'ClientNotifications' },
    { file: 'SteamClient/Cloud', object: 'SteamClient.Cloud', srcName: 'Cloud' },
    { file: 'SteamClient/CommunityItems', object: 'SteamClient.CommunityItems', srcName: 'CommunityItems' },
    { file: 'SteamClient/Console', object: 'SteamClient.Console', srcName: 'Console' },
    { file: 'SteamClient/Customization', object: 'SteamClient.Customization', srcName: 'Customization' },
    { file: 'SteamClient/Downloads', object: 'SteamClient.Downloads', srcName: 'Downloads' },
    { file: 'SteamClient/FamilySharing', object: 'SteamClient.FamilySharing', srcName: 'FamilySharing' },
    { file: 'SteamClient/Friends', object: 'SteamClient.Friends', srcName: 'Friends' },
    { file: 'SteamClient/FriendSettings', object: 'SteamClient.FriendSettings', srcName: 'FriendSettings' },
    { file: 'SteamClient/GameNotes', object: 'SteamClient.GameNotes', srcName: 'GameNotes' },
    { file: 'SteamClient/GameRecording', object: 'SteamClient.GameRecording', srcName: 'GameRecording' },
    { file: 'SteamClient/User', object: 'SteamClient.User', srcName: 'User' },
    { file: 'Global/App', object: 'window.App', srcName: 'App' },
    { file: 'Global/ConnectionManager', object: 'window.App.cm', srcName: 'ConnectionManager'},
    { file: 'Global/ConnectionManager', object: 'window.appAchievementProgressCache.CMInterface', srcName: 'ConnectionManager'},
]