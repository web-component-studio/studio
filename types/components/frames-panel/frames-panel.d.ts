import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'studio-frames-panel': FramesPanel;
    }
}
export declare class FramesPanel extends LitElement {
    static styles: import("lit").CSSResult[];
    connectedCallback(): void;
    render(): import("lit-html").TemplateResult<1>;
}
