import { ParsingExtension } from '@app-config/core';
import { EnvironmentAliases } from '@app-config/node';
/** Substitues environment variables found in strings (similar to bash variable substitution) */
export declare function substituteDirective(aliases?: EnvironmentAliases, environmentOverride?: string, environmentSourceNames?: string[] | string): ParsingExtension;
