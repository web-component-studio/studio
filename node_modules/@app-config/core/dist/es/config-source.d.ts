import { Json } from '@app-config/utils';
import { ParsedValue, ParsingContext, ParsingExtension } from './parsed-value';
/**
 * File formats that app-config supports.
 */
export declare enum FileType {
    YAML = "YAML",
    TOML = "TOML",
    JSON = "JSON",
    JSON5 = "JSON5",
    /** @hidden Raw is only used for CLI output */
    RAW = "RAW"
}
/** Base class for "sources", which are strategies to read configuration (eg. files, environment variables) */
export declare abstract class ConfigSource {
    readonly filePath?: string;
    /** Only method that is *required* for all ConfigSources, which is built on in readValue, read, and readToJSON */
    protected abstract readContents(): Promise<[string, FileType]>;
    /** Parses contents of the source */
    readValue(): Promise<Json>;
    /** Reads the contents of the source into a full ParsedValue (not the raw JSON, like readValue) */
    read(extensions?: ParsingExtension[], context?: ParsingContext): Promise<ParsedValue>;
    /** Ergonomic helper for chaining `source.read(extensions).then(v => v.toJSON())` */
    readToJSON(extensions?: ParsingExtension[], context?: ParsingContext): Promise<Json>;
}
/** Read configuration from a literal JS object */
export declare class LiteralSource extends ConfigSource {
    private readonly value;
    constructor(value: Json);
    readContents(): Promise<[string, FileType]>;
    readValue(): Promise<Json>;
}
/** Read configuration from many ConfigSources and merge them */
export declare class CombinedSource extends ConfigSource {
    readonly sources: ConfigSource[];
    constructor(sources: ConfigSource[]);
    readContents(): Promise<[string, FileType]>;
    readValue(): Promise<Json>;
    read(extensions?: ParsingExtension[], context?: ParsingContext): Promise<ParsedValue>;
}
/** Read configuration from the first ConfigSource that doesn't fail */
export declare class FallbackSource extends ConfigSource {
    readonly sources: ConfigSource[];
    constructor(sources: ConfigSource[]);
    readContents(): Promise<[string, FileType]>;
    readValue(): Promise<Json>;
    read(extensions?: ParsingExtension[], context?: ParsingContext): Promise<ParsedValue>;
}
/**
 * Converts a JSON object to a string, using specified file type.
 */
export declare function stringify(config: Json, fileType: FileType, minimal?: boolean): string;
/**
 * Returns which file type to use, based on the file extension.
 */
export declare function filePathAssumedType(filePath: string): FileType;
/**
 * Parses string based on a file format.
 */
export declare function parseRawString(contents: string, fileType: FileType): Promise<Json>;
/**
 * Try to parse string as different file formats, returning the first that worked.
 */
export declare function guessFileType(contents: string): Promise<FileType>;
