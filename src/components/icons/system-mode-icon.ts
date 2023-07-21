

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import sharedStyles from '../../assets/styles/shared.css';


declare global {
  interface HTMLElementTagNameMap {
    'system-mode-icon': SystemModeIcon
  }
}

@customElement('system-mode-icon')
export class SystemModeIcon extends LitElement {
  static styles = [ sharedStyles ];

  render() {
    return html`
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8 21V19H10V17H4C3.45 17 2.97917 16.8042 2.5875 16.4125C2.19583 16.0208 2 15.55 2 15V5C2 4.45 2.19583 3.97917 2.5875 3.5875C2.97917 3.19583 3.45 3 4 3H20C20.55 3 21.0208 3.19583 21.4125 3.5875C21.8042 3.97917 22 4.45 22 5V15C22 15.55 21.8042 16.0208 21.4125 16.4125C21.0208 16.8042 20.55 17 20 17H14V19H16V21H8ZM4 15H20V5H4V15Z" fill="currentColor"/>
      </svg>
    `;
  }
}
