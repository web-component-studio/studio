declare const fullConfig: {
    components: string;
    customHints?: string | undefined;
    outputPath?: string | undefined;
    title?: string | undefined;
    paramType: "hash" | "search";
    localStorageKey?: string | undefined;
    widths?: number[] | undefined;
    snippets?: Snippet[] | undefined;
    exampleCode?: string | undefined;
    cwd?: string | undefined;
    viteConfig?: (() => void) | undefined;
    baseUrl?: string | undefined;
    iframeSandbox?: string | undefined;
};
export default fullConfig;
