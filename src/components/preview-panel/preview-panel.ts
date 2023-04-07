import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';

import sharedStyles from '../../assets/styles/shared.css?inline';
import previewPanelStyles from './preview-panel.css?inline';

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


  render() {
    return html`
      <div>
        preview panel
      </div>
    `;
  }
}
