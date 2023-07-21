

import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import sharedStyles from '../../assets/styles/shared.css';


declare global {
  interface HTMLElementTagNameMap {
    'share-icon': ShareIcon
  }
}

@customElement('share-icon')
export class ShareIcon extends LitElement {
  static styles = [ sharedStyles ];

  render() {
    return html`
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 0L8 4H11V13H13V4H16M18 22H6C4.89 22 4 21.1 4 20V8C4 7.46957 4.21071 6.96086 4.58579 6.58579C4.96086 6.21071 5.46957 6 6 6H9V8H6V20H18V8H15V6H18C18.5304 6 19.0391 6.21071 19.4142 6.58579C19.7893 6.96086 20 7.46957 20 8V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22Z" fill="currentColor"/>
      </svg>
    `;
  }
}
