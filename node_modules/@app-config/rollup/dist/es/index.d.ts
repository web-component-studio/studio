import type { Plugin } from 'rollup';
import { ConfigLoadingOptions } from '@app-config/config';
import { SchemaLoadingOptions } from '@app-config/schema';
export interface Options {
    useGlobalNamespace?: boolean;
    loadingOptions?: ConfigLoadingOptions;
    schemaLoadingOptions?: SchemaLoadingOptions;
    injectValidationFunction?: boolean;
    noBundledConfig?: boolean;
    /** @deprecated use useGlobalNamespace instead */
    readGlobal?: boolean;
}
export default function appConfigRollup(options?: Options): Plugin & {
    currentFilePaths?: string[];
};
