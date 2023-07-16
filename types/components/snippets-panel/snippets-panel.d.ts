import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'studio-snippets-panel': StudioSnippetsPanel;
    }
}
export declare class StudioSnippetsPanel extends LitElement {
    #private;
    static styles: import("lit").CSSResult[];
    render(): import("lit-html").TemplateResult<1>;
}
