import { ConfigSource, FileType } from '@app-config/core';
/** Read configuration from an environment variable */
export declare class EnvironmentSource extends ConfigSource {
    readonly variableName: string;
    constructor(variableName: string);
    readContents(): Promise<[string, FileType]>;
}
