import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';

import sharedStyles from '../../assets/styles/shared.css';


declare global {
  interface HTMLElementTagNameMap {
    'settings-icon': SettingsIcon
  }
}

@customElement('settings-icon')
export class SettingsIcon extends LitElement {
  static styles = [
    css`${unsafeCSS(sharedStyles)}`
  ];

  render() {
    return html`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M16 3C15.4477 3 15 3.44772 15 4V8C15 8.55228 15.4477 9 16 9C16.5523 9 17 8.55228 17 8V7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H17V4C17 3.44772 16.5523 3 16 3ZM3 6C3 5.44772 3.44772 5 4 5H13V7H4C3.44772 7 3 6.55228 3 6ZM3 12C3 11.4477 3.44772 11 4 11H7V10C7 9.44772 7.44772 9 8 9C8.55228 9 9 9.44772 9 10V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V13H4C3.44772 13 3 12.5523 3 12ZM4 17C3.44772 17 3 17.4477 3 18C3 18.5523 3.44772 19 4 19H9V17H4ZM20 11H11V13H20C20.5523 13 21 12.5523 21 12C21 11.4477 20.5523 11 20 11ZM13 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H13V20C13 20.5523 12.5523 21 12 21C11.4477 21 11 20.5523 11 20V19V17V16C11 15.4477 11.4477 15 12 15C12.5523 15 13 15.4477 13 16V17Z" fill="currentColor"/>
      </svg>
    `;
  }
}
