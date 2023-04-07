import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';

import sharedStyles from '../../assets/styles/shared.css?inline';
import widthsPanelStyles from './widths-panel.css?inline';

declare global {
  interface HTMLElementTagNameMap {
    'studio-widths-panel': StudioWidthsPanel
  }
}

@customElement('studio-widths-panel')
export class StudioWidthsPanel extends LitElement {
  static styles = [
    css`${unsafeCSS(sharedStyles)}`,
    css`${unsafeCSS(widthsPanelStyles)}`
  ];


  render() {
    return html`
      <div>
        widths panel
      </div>
    `;
  }
}
