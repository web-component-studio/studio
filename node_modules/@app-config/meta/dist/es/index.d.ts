import type { RendererOptions } from 'quicktype-core';
import { JsonObject } from '@app-config/utils';
import { ParsingExtension, FileType } from '@app-config/core';
export interface MetaLoadingOptions {
    directory?: string;
    fileNameBase?: string;
    lookForWorkspace?: string | false;
}
export interface TeamMember {
    userId: string;
    keyName?: string | null;
    publicKey: string;
}
export interface EncryptedSymmetricKey {
    revision: number;
    key: string;
}
export interface ParsingExtensionWithOptions {
    name: string;
    options?: JsonObject;
}
export interface GenerateFile {
    file: string;
    name?: string;
    type?: string;
    augmentModule?: boolean;
    leadingComments?: string[];
    rendererOptions?: RendererOptions;
}
export interface MetaProperties {
    teamMembers?: TeamMember[];
    encryptionKeys?: EncryptedSymmetricKey[];
    generate?: GenerateFile[];
    parsingExtensions?: (ParsingExtensionWithOptions | string)[];
    environmentAliases?: Record<string, string>;
    environmentSourceNames?: string[] | string;
}
export interface MetaConfiguration {
    filePath?: string;
    fileType?: FileType;
    value: MetaProperties;
}
export declare function loadMetaConfig({ directory, fileNameBase, lookForWorkspace, }?: MetaLoadingOptions): Promise<MetaConfiguration>;
export declare function loadMetaConfigLazy(options?: MetaLoadingOptions): Promise<MetaConfiguration>;
export declare function loadExtraParsingExtensions({ value, }: MetaConfiguration): Promise<ParsingExtension[]>;
export declare function loadExtraParsingExtension(extensionConfig: ParsingExtensionWithOptions | string): Promise<ParsingExtension>;
