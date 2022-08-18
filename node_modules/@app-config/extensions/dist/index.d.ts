import { ParsingExtension } from '@app-config/core';
export { tryDirective } from './try-directive';
export { ifDirective } from './if-directive';
export { eqDirective } from './eq-directive';
export { hiddenDirective } from './hidden-directive';
export { envDirective } from './env-directive';
export { extendsDirective, extendsSelfDirective, overrideDirective } from './extends-directive';
export { timestampDirective } from './timestamp-directive';
export { envVarDirective } from './env-var-directive';
export { substituteDirective } from './substitute-directive';
export { substituteDirective as environmentVariableSubstitution } from './substitute-directive';
export { parseDirective } from './parse-directive';
/** Marks all values recursively as fromSecrets, so they do not trigger schema errors */
export declare function markAllValuesAsSecret(): ParsingExtension;
/** When a key $$foo is seen, change it to be $foo and mark with meta property fromEscapedDirective */
export declare function unescape$Directives(): ParsingExtension;
