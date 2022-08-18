import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';

import {EditorView, basicSetup} from "codemirror";
import { html as langHtml } from "@codemirror/lang-html"
import { nord } from 'cm6-theme-nord';

import codeEditorStyles from './code-editor.css?inline';

declare global {
  interface HTMLElementTagNameMap {
    'code-editor': CodeEditor
  }
}

@customElement('code-editor')
export class CodeEditor extends LitElement {
  static styles = [css`${unsafeCSS(codeEditorStyles)}`];

  #codeMirrorInstance!: EditorView;

  @query('#code-mirror-parent') editorParent?: HTMLTextAreaElement;

  @property({type: String}) intro!: string;

  firstUpdated() {

    this.#codeMirrorInstance = new EditorView({
      doc: this.intro,
      extensions: [
        basicSetup,
        langHtml(),
        nord,
        EditorView.updateListener.of((update) => console.log(update))
      ],
      parent: this.editorParent
    });

  }

  render() {
    return html`
      <div id="code-mirror-parent"></div>
    `;
  }
}
