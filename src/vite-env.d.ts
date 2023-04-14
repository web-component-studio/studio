/// <reference types="vite/client" />

interface Window {
  allRegisteredComponents: RegisteredCustomElement[]
  __studioConfig__: StudioConfig;
}

declare const __GLOBAL_STUDIO_CONFIG__: StudioConfig
declare const __STUDIO_SNIPPETS__: Snippet[];

interface StudioConfig {
  components: string;
  customHints?: string;
  outputPath?: string;
  title?: string;
  paramType: 'hash' | 'search';
  localStorageKey?: string;
  widths?: number[];
  snippets?: Snippet[];
  exampleCode?: string;
  cwd?: string;
  viteConfig?: () => void;
  baseUrl?: string;
  iframeSandbox?: string;
}

interface Snippet {
  name: string;
  desc: string;
  code: string;
}

interface RegisteredCustomElement {
  tag: string;
  ctor: CustomElementConstructor;
}

type CustomElementsDefinition = [name: string, constructor: CustomElementConstructor, options?: ElementDefinitionOptions | undefined];


