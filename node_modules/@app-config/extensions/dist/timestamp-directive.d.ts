import type { ParsingExtension } from '@app-config/core';
/** Provides the current timestamp using { $timestamp: true } */
export declare function timestampDirective(dateSource?: () => Date): ParsingExtension;
