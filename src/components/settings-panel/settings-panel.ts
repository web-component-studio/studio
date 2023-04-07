import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';

import sharedStyles from '../../assets/styles/shared.css?inline';
import settingsPanelStyles from './settings-panel.css?inline';

declare global {
  interface HTMLElementTagNameMap {
    'studio-settings-panel': StudioSettingsPanel
  }
}

@customElement('studio-settings-panel')
export class StudioSettingsPanel extends LitElement {
  static styles = [
    css`${unsafeCSS(sharedStyles)}`,
    css`${unsafeCSS(settingsPanelStyles)}`
  ];


  render() {
    return html`
      <div>
        settings panel
      </div>
    `;
  }
}
