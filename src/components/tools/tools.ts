import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';

import toolsStyles from './tools.css?inline';

declare global {
  interface HTMLElementTagNameMap {
    'studio-tools': StudioTools
  }
}

@customElement('studio-tools')
export class StudioTools extends LitElement {
  static styles = [css`${unsafeCSS(toolsStyles)}`];

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

  render() {
    return html`
      <div class="studio-tools-main">
        <div class="tools-panel ${this.panelOpen ? 'open': ''}">
          ${this.currentPanel}
        </div>
        <div class="toolbar">
          <div class="tools-primary">
            <button @click=${() => this.handleOpenToolPanel('snippets')}>Snippets</button>
            <button @click=${() => this.handleOpenToolPanel('widths')}>Widths</button>
            <button @click=${() => this.handleOpenToolPanel('preview')}>Preview</button>
            <button @click=${() => this.handleOpenToolPanel('share')}>Share</button>
          </div>
          <div class="tools-secondary">
            <button @click=${() => this.handleOpenToolPanel('settings')}>Settings</button>
          </div>
        </div>
      </div>
    `;
  }
}
