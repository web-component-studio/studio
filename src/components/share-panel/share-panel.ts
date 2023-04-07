import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';

import sharedStyles from '../../assets/styles/shared.css?inline';
import sharePanelStyles from './share-panel.css?inline';

declare global {
  interface HTMLElementTagNameMap {
    'studio-share-panel': StudioSharePanel
  }
}

@customElement('studio-share-panel')
export class StudioSharePanel extends LitElement {
  static styles = [
    css`${unsafeCSS(sharedStyles)}`,
    css`${unsafeCSS(sharePanelStyles)}`
  ];


  render() {
    return html`
      <div>
        share panel
      </div>
    `;
  }
}
