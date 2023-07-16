import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'code-editor': CodeEditor;
    }
}
export declare class CodeEditor extends LitElement {
    static styles: import("lit").CSSResult[];
    editorParent?: HTMLTextAreaElement;
    resizeParent?: HTMLDivElement;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult<1>;
}
