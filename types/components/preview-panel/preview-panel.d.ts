import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'studio-preview-panel': StudioPreviewPanel;
    }
}
export declare class StudioPreviewPanel extends LitElement {
    static styles: import("lit").CSSResult[];
    get previewUrl(): string;
    copyPreviewUrl(): void;
    render(): import("lit-html").TemplateResult<1>;
}
