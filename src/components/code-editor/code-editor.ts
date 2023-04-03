import { LitElement, html, css } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { unsafeCSS } from 'lit';
import { EditorView, basicSetup } from "codemirror";
import { html as langHtml } from "@codemirror/lang-html";
import studioConfig from '../../config/config';
import { Store } from '../../store/store';
import { debounce } from '../../utils';

// import { nord } from 'cm6-theme-nord';

import codeEditorStyles from './code-editor.css?inline';

declare global {
  interface HTMLElementTagNameMap {
    'code-editor': CodeEditor
  }
}

@customElement('studio-code-editor')
export class CodeEditor extends LitElement {
  static styles = [css`${unsafeCSS(codeEditorStyles)}`];

  #codeMirrorInstance!: EditorView;

  @query('#code-mirror-parent') editorParent?: HTMLTextAreaElement;

  firstUpdated() {
    this.#codeMirrorInstance = new EditorView({
      doc: studioConfig.exampleCode || '<button>Im a button</button>',
      extensions: [
        basicSetup,
        langHtml({ extraTags: {
          'some-tag': { globalAttrs: false,attrs: { test: ['value1'], thing: ['value2']}}
        }}),
        // nord,
        EditorView.updateListener.of((update: any) => {
          Store.code = update.state.doc.toString();
        })
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
