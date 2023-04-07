import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';
import { snippets } from '../../snippets';

import sharedStyles from '../../assets/styles/shared.css?inline';
import snippetsPanelStyles from './snippets-panel.css?inline';

declare global {
  interface HTMLElementTagNameMap {
    'studio-snippets-panel': StudioSnippetsPanel
  }
}

@customElement('studio-snippets-panel')
export class StudioSnippetsPanel extends LitElement {
  static styles = [
    css`${unsafeCSS(sharedStyles)}`,
    css`${unsafeCSS(snippetsPanelStyles)}`
  ];


  render() {
    return html`
      <div class="snippet-panel-inner">
        <input class="snippet-filter" type="text" />
        <ul class="snippet-list">
          ${snippets.map((snippet) => {
            return html`<li>
              <p>${snippet.name}</p>
              <small>${snippet.desc}</p>
            </li>`
          })}
        </ul>
      </div>
    `;
  }
}
