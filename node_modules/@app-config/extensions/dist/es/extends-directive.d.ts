import type { ParsingExtension } from '@app-config/core';
/** Uses another file as overriding values, layering them on top of current file */
export declare function overrideDirective(): ParsingExtension;
/** Uses another file as a "base", and extends on top of it */
export declare function extendsDirective(): ParsingExtension;
/** Lookup a property in the same file, and "copy" it */
export declare function extendsSelfDirective(): ParsingExtension;
