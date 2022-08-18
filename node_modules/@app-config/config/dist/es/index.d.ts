import { Json } from '@app-config/utils';
import { ParsedValue, ParsingExtension } from '@app-config/core';
import { EnvironmentAliases } from '@app-config/node';
import { JSONSchema, SchemaLoadingOptions, Schema } from '@app-config/schema';
export interface ConfigLoadingOptions {
    directory?: string;
    fileNameBase?: string;
    secretsFileNameBase?: string;
    environmentVariableName?: string;
    extensionEnvironmentVariableNames?: string[];
    environmentOverride?: string;
    environmentAliases?: EnvironmentAliases;
    environmentSourceNames?: string[] | string;
    parsingExtensions?: ParsingExtension[];
    secretsFileExtensions?: ParsingExtension[];
    environmentExtensions?: ParsingExtension[];
    defaultValues?: Json;
}
export interface LoadedConfiguration {
    /** full configuration plain JSON, with secrets and nonSecrets */
    fullConfig: Json;
    /** parsed configuration value, with metadata (like ConfigSource) still attached */
    parsed: ParsedValue;
    parsedSecrets?: ParsedValue;
    parsedNonSecrets?: ParsedValue;
    /** the current environment that was loaded from given options */
    environment?: string;
    /** non-exhaustive list of files that were read (useful for reloading in plugins) */
    filePaths?: string[];
    /** if loadValidatedConfig, this is the normalized JSON schema that was used for validation */
    schema?: JSONSchema;
    /** if loadValidatedConfig, this is the raw AJV validation function */
    validationFunctionCode?: Schema['validationFunctionCode'];
}
export declare function loadUnvalidatedConfig({ directory, fileNameBase, secretsFileNameBase, environmentVariableName, extensionEnvironmentVariableNames, environmentOverride, environmentAliases: environmentAliasesArg, environmentSourceNames: environmentSourceNamesArg, parsingExtensions: parsingExtensionsArg, secretsFileExtensions: secretsFileExtensionsArg, environmentExtensions, defaultValues, }?: ConfigLoadingOptions): Promise<LoadedConfiguration>;
export declare function loadValidatedConfig(options?: ConfigLoadingOptions, schemaOptions?: SchemaLoadingOptions): Promise<LoadedConfiguration>;
