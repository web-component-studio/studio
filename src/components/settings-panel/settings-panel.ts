import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import sharedStyles from '../../assets/styles/shared.css';
import panelSharedStyles from '../../assets/styles/panel-shared.css';
import settingsPanelStyles from './settings-panel.css';

declare global {
  interface HTMLElementTagNameMap {
    'studio-settings-panel': StudioSettingsPanel
  }
}

@customElement('studio-settings-panel')
export class StudioSettingsPanel extends LitElement {
  static styles = [
    sharedStyles,
    panelSharedStyles,
    settingsPanelStyles
  ];


  render() {
    return html`
      <aside>
        <h2>Theme</h2>
        <ul class="theme-setting">
          <li><button class="enabled"><light-mode-icon></light-mode-icon></button></li>
          <li><button><dark-mode-icon></dark-mode-icon></button></li>
          <li><button><system-mode-icon></system-mode-icon></button></li>
        </ul>
      </aside>
    `;
  }
}
