import type { ParsingExtension } from '@app-config/core';
import { EnvironmentAliases } from '@app-config/node';
/** Looks up an environment-specific value ($env) */
export declare function envDirective(aliases?: EnvironmentAliases, environmentOverride?: string, environmentSourceNames?: string[] | string): ParsingExtension;
