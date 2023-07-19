import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';

import sharedStyles from '../../assets/styles/shared.css';
import previewPanelStyles from './preview-panel.css';

declare global {
  interface HTMLElementTagNameMap {
    'studio-preview-panel': StudioPreviewPanel
  }
}

@customElement('studio-preview-panel')
export class StudioPreviewPanel extends LitElement {
  static styles = [
    css`${unsafeCSS(sharedStyles)}`,
    css`${unsafeCSS(previewPanelStyles)}`
  ];

  get previewUrl():string {
    const currentPath = new URL(window.location.href);
    currentPath.pathname = '/preview/'
    return currentPath.toString();
  }

  copyPreviewUrl(){
    navigator.clipboard && navigator.clipboard.writeText(this.previewUrl)
  }

  render() {
    return html`
      <aside>
        <h2>Preview</h2>
        <ul>
          <li>
            <a href=${this.previewUrl} target="_blank" title="Open preview in new window" rel="noopener noreferrer">Open Preview</a>
          </li>
          <li>
            <button @click=${this.copyPreviewUrl}>Copy Link</button>
          </li>
        </ul>
      </aside>
    `;
  }
}
