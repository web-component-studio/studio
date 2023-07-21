import { LitElement, html, TemplateResult } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import sharedStyles from '../../assets/styles/shared.css';
import toolsStyles from './tools.css';

declare global {
  interface HTMLElementTagNameMap {
    'studio-tools': StudioTools
  }
}

const PANEL_LOOKUP: Record<string, TemplateResult> = {
  snippets: html`<studio-snippets-panel></studio-snippets-panel>`,
  widths: html`<studio-widths-panel></studio-widths-panel>`,
  share: html`<studio-share-panel></studio-share-panel>`,
  preview: html`<studio-preview-panel></studio-preview-panel>`,
  settings: html`<studio-settings-panel></studio-settings-panel>`
}

@customElement('studio-tools')
export class StudioTools extends LitElement {
  static styles = [
    sharedStyles,
    toolsStyles
  ];

  @state() panelOpen = false;

  @state() currentPanel?: string;

  handleOpenToolPanel(panelName: string) {
    if(this.currentPanel === panelName){
      this.currentPanel = undefined;
      this.panelOpen = false;
    } else {
      this.currentPanel = panelName;
      this.panelOpen = true;
    }
  }

  copyStudioUrl() {
    navigator.clipboard && navigator.clipboard.writeText(window.location.href)
  }

  render() {
    return html`
      <div class="studio-tools-main">
        <div class="tools-panel ${this.panelOpen ? 'open': ''}">
          ${PANEL_LOOKUP[this.currentPanel || '']}
        </div>
        <div class="toolbar">
          <div class="tools-primary">
            <button title="Add a snippet" class="snippets" @click=${() => this.handleOpenToolPanel('snippets')}>
              <snippet-icon class="tools-icon"></snippet-icon>
              <span class="visually-hidden">Snippets</span>
            </button>
            <button title="Enable/disable widths" class="widths" @click=${() => this.handleOpenToolPanel('widths')}>
              <widths-icon class="tools-icon"></widths-icon>
              <span class="visually-hidden">Widths</span>
            </button>
            <button title="Open a preview window" class="preview" @click=${() => this.handleOpenToolPanel('preview')}>
              <preview-icon class="tools-icon"></preview-icon>
              <span class="visually-hidden">Preview</span>
            </button>
            <button title="Copy the url to this studio" class="share" @click=${this.copyStudioUrl}>
              <share-icon class="tools-icon"></share-icon>
              <span class="visually-hidden">Share</span>
            </button>
          </div>
          <div class="tools-secondary">
            <button title="Settings" class="settings" @click=${() => this.handleOpenToolPanel('settings')}>
              <settings-icon class="tools-icon"></settings-icon>
              <span class="visually-hidden">Settings</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }
}
