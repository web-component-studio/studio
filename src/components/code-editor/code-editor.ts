import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
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
  @query('.resizable') resizeParent?: HTMLDivElement;

  firstUpdated() {
    this.#codeMirrorInstance = new EditorView({
      doc: Store.code,
      extensions: [
        basicSetup,
        langHtml({ extraTags: {
          'some-tag': { globalAttrs: false,attrs: { test: ['value1'], thing: ['value2']}}
        }}),
        // nord,
        EditorView.updateListener.of((update: any) => {console.log(update);
          Store.cursorPos = update.state.selection.main.head;
          debounce(() => {
            Store.code = update.state.doc.toString();
          }, 150)();
        })
      ],
      parent: this.editorParent
    });
  }

  testInsert(){
    this.#codeMirrorInstance.dispatch({changes: { from: Store.cursorPos, insert: '<p>Test INSERT </p>'}})
  }

  render() {
    return html`
      <div id="code-mirror-parent" style="resize: vertical;"></div>
    `;
  }
}
