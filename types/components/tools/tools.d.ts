import { LitElement } from 'lit';
import '../preview-panel/preview-panel';
import '../settings-panel/settings-panel';
import '../widths-panel/widths-panel';
import '../snippets-panel/snippets-panel';
import '../share-panel/share-panel';
declare global {
    interface HTMLElementTagNameMap {
        'studio-tools': StudioTools;
    }
}
export declare class StudioTools extends LitElement {
    static styles: import("lit").CSSResult[];
    panelOpen: boolean;
    currentPanel?: string;
    handleOpenToolPanel(panelName: string): void;
    copyStudioUrl(): void;
    render(): import("lit-html").TemplateResult<1>;
}
