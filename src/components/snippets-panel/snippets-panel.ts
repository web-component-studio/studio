import { LitElement, html, css } from 'lit';
import { customElement, state, query } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';
import { snippets } from '../../snippets';
import { Store } from '../../store/store';
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


  #previewSnippet(event: Event, snippetIndex: number) {

    const currentCode: string = Store.editor!.state.doc.toString();

    const codeToPreview = `${currentCode?.slice(0,Store.cursorPos)}${snippets[snippetIndex].code}${currentCode?.slice(Store.cursorPos)}`

    Store.code = codeToPreview;

    const mouseLeaveHandler = (event: Event) => {
      Store.code = currentCode;
      event.currentTarget?.removeEventListener('mouseleave', mouseLeaveHandler);
      event.currentTarget?.removeEventListener('click', clickHandler);
    }

    const clickHandler = (event: Event) => {
      Store.editor?.dispatch({changes: { from: Store.cursorPos, insert: snippets[snippetIndex].code}})
      event.currentTarget?.removeEventListener('click', clickHandler);
      event.currentTarget?.removeEventListener('mouseleave', mouseLeaveHandler);
    }

    event.currentTarget?.addEventListener('click', clickHandler);
    event.currentTarget?.addEventListener('mouseleave', mouseLeaveHandler);

  }

  render() {
    return html`
      <div class="snippet-panel-inner">
        <div class="snippet-filter">
          <input type="text" placeholder="Search for a snippet"/>
        </div>
        <div class="snippet-list-container">
          <ul class="snippet-list">
            ${snippets.map((snippet: Snippet, index: number) => {
              return html`<li>
                <button @mouseenter=${(event:Event) => this.#previewSnippet(event, index)}>
                  <p>${snippet.name}</p>
                  <small>${snippet.desc}</small>
                </button>
              </li>`
            })}
          </ul>
        </div>
      </div>
    `;
  }
}
