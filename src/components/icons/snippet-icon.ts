

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';

import sharedStyles from '../../assets/styles/shared.css';


declare global {
  interface HTMLElementTagNameMap {
    'snippet-icon': SnippetIcon
  }
}

@customElement('snippet-icon')
export class SnippetIcon extends LitElement {
  static styles = [
    css`${unsafeCSS(sharedStyles)}`
  ];

  render() {
    return html`
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <clipPath id="a" fill="none">
          <rect x="2" y="2" width="9" height="9" rx="1"/>
        </clipPath>
        <rect x="2" y="2" width="9" height="9" rx="1" stroke="currentColor" stroke-width="4" clip-path="url(#a)"/>
        <clipPath id="b" fill="none">
          <rect x="2" y="13" width="9" height="9" rx="1"/>
        </clipPath>
        <rect x="2" y="13" width="9" height="9" rx="1" stroke="currentColor" stroke-width="4" clip-path="url(#b)"/>
        <clipPath id="c" fill="none">
          <rect x="13" y="2" width="9" height="9" rx="1"/>
        </clipPath>
        <rect x="13" y="2" width="9" height="9" rx="1" stroke="currentColor" stroke-width="4" clip-path="url(#c)"/>
        <rect x="16.5" y="13" width="2" height="9" rx="1" fill="currentColor"/>
        <rect x="22" y="16.5" width="2" height="9" rx="1" transform="rotate(90 22 16.5)" fill="currentColor"/>
      </svg>
    `;
  }
}
