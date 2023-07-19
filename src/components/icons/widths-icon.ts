


import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';

import sharedStyles from '../../assets/styles/shared.css';


declare global {
  interface HTMLElementTagNameMap {
    'widths-icon': WidthsIcon
  }
}

@customElement('widths-icon')
export class WidthsIcon extends LitElement {
  static styles = [
    css`${unsafeCSS(sharedStyles)}`
  ];

  render() {
    return html`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="a" fill="none">
        <rect x="1" y="4" width="6" height="16" rx="1"/>
        </clipPath>
        <rect x="1" y="4" width="6" height="16" rx="1" stroke="currentColor" stroke-width="4" clip-path="url(#a)"/>
        <clipPath id="b" fill="none">
        <rect x="9" y="4" width="6" height="16" rx="1"/>
        </clipPath>
        <rect x="9" y="4" width="6" height="16" rx="1" stroke="currentColor" stroke-width="4" clip-path="url(#b)"/>
        <clipPath id="c" fill="none">
        <rect x="17" y="4" width="6" height="16" rx="1"/>
        </clipPath>
        <rect x="17" y="4" width="6" height="16" rx="1" stroke="currentColor" stroke-width="4" clip-path="url(#c)"/>
      </svg>
    `;
  }
}
