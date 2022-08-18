export interface Settings {
    secretAgent?: {
        key: string;
        cert: string;
        expiry: string;
        port?: number;
        socket?: string;
    };
}
export declare function settingsDirectory(): string;
export declare function loadSettings(): Promise<Settings>;
export declare function saveSettings(newSettings: Settings): Promise<void>;
export declare function loadSettingsLazy(): Promise<Settings>;
