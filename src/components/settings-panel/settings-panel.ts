import { LitElement, html } from 'lit';
import { Store } from '../../store/store';
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

  connectedCallback(): void {
    super.connectedCallback()
    Store.attach(this);
  }

  handleDarkModeToggle(event: MouseEvent) {
    const newMode = (event.target as HTMLButtonElement).name;
    // toggle mode on HTML element
    if(newMode !== 'system') {
      document.documentElement.dataset.theme = newMode;
    } else {
      delete document.documentElement.dataset.theme;
    }

    // set localStorage
    Store.darkMode = newMode;
  }


  render() {
    return html`
      <aside>
        <h2>Theme</h2>
        <ul class="theme-setting">
          <li><button @click=${this.handleDarkModeToggle} name="light" class="${ Store.darkMode === 'light' ? 'enabled' : '' }"><light-mode-icon inert></light-mode-icon></button></li>
          <li><button @click=${this.handleDarkModeToggle} name="dark" class="${ Store.darkMode === 'dark' ? 'enabled' : '' }"><dark-mode-icon inert></dark-mode-icon></button></li>
          <li><button @click=${this.handleDarkModeToggle} name="system" class="${ Store.darkMode === 'system' ? 'enabled' : '' }"><system-mode-icon inert></system-mode-icon></button></li>
        </ul>
      </aside>
    `;
  }
}
