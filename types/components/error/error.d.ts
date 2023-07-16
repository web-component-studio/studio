import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'studio-frames-panel': FramesPanel;
    }
}
export declare class FramesPanel extends LitElement {
    error: any;
    render(): import("lit-html").TemplateResult<1>;
}
