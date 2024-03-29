import { LitElement, html } from 'lit';
import { Store } from '../../store/store';
import { compressParams } from '../../utils';
import { customElement } from 'lit/decorators.js';
import panelSharedStyles from '../../assets/styles/panel-shared.css';
import sharedStyles from '../../assets/styles/shared.css';
import previewPanelStyles from './preview-panel.css';

import '../icons/preview-icon';

declare global {
  interface HTMLElementTagNameMap {
    'studio-preview-panel': StudioPreviewPanel
  }
}

@customElement('studio-preview-panel')
export class StudioPreviewPanel extends LitElement {
  static styles = [
    sharedStyles,
    panelSharedStyles,
    previewPanelStyles
  ];

  connectedCallback(): void {
    super.connectedCallback();
    Store.attach(this)
  }

  get previewUrl():string {
    return `/preview/?env=${compressParams({mode: Store.darkMode, code: Store.code})}`;
  }

  copyPreviewUrl() {
    navigator.clipboard && navigator.clipboard.writeText(this.previewUrl)
  }

  render() {
    return html`
      <aside>
        <h2>Preview</h2>
        <studio-stack>
          <a class="preview-link" href=${this.previewUrl} target="_blank" title="Open preview in new window" rel="noopener noreferrer">
            Open Preview
            <preview-icon></preview-icon>
          </a>
          <button class="copy-preview-button" @click=${this.copyPreviewUrl}>Copy Link</button>
        </studio-stack>
      </aside>
    `;
  }
}
