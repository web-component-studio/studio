import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'studio-widths-panel': StudioWidthsPanel;
    }
}
export declare class StudioWidthsPanel extends LitElement {
    static styles: import("lit").CSSResult[];
    handleWidthSelect(event: Event): void;
    render(): import("lit-html").TemplateResult<1>;
}
