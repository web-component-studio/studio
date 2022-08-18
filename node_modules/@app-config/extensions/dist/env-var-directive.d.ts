import type { ParsingExtension } from '@app-config/core';
import { EnvironmentAliases } from '@app-config/node';
/** Substitutes environment variables */
export declare function envVarDirective(aliases?: EnvironmentAliases, environmentOverride?: string, environmentSourceNames?: string[] | string): ParsingExtension;
