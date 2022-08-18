import { ConfigSource, FileType, ParsedValue, ParsingExtension, ParsingContext } from '@app-config/core';
import { EnvironmentAliases, EnvironmentOptions } from './environment';
/** Read configuration from a single file */
export declare class FileSource extends ConfigSource {
    readonly filePath: string;
    readonly fileType: FileType;
    constructor(filePath: string, fileType?: FileType);
    readContents(): Promise<[string, FileType]>;
}
/** Read configuration from a file, found via "glob-like" search (any file format, with support for environment specific files) */
export declare class FlexibleFileSource extends ConfigSource {
    readonly filePath: string;
    private readonly fileExtensions;
    private readonly environmentOptions;
    constructor(filePath: string, fileExtensions?: string[], environmentOptions?: EnvironmentOptions);
    /** @deprecated use constructor with environmentOptions instead */
    constructor(filePath: string, environmentOverride?: string, environmentAliases?: EnvironmentAliases, fileExtensions?: string[], environmentSourceNames?: string[] | string);
    private resolveSource;
    readContents(): Promise<[string, FileType]>;
    read(extensions?: ParsingExtension[], context?: ParsingContext): Promise<ParsedValue>;
}
export declare function resolveFilepath(source: ConfigSource, filepath: string): string;
