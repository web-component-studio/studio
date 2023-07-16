import { LitElement, html, css, unsafeCSS } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { EditorView, basicSetup } from 'codemirror';
import { html as langHtml } from '@codemirror/lang-html';
import { Store } from '../../store/store';
import { debounce } from '../../utils';
import { hints } from '../../hints';
import { studioTheme } from './studio-theme';

import codeEditorStyles from './code-editor.css';

declare global {
  interface HTMLElementTagNameMap {
    'code-editor': CodeEditor
  }
}

@customElement('studio-code-editor')
export class CodeEditor extends LitElement {
  static styles = [css`${unsafeCSS(codeEditorStyles)}`];

  @query('#code-mirror-parent') editorParent?: HTMLTextAreaElement;
  @query('.resizable') resizeParent?: HTMLDivElement;

  firstUpdated() {
    const debouncedUpdate = debounce((update: any) => {
      Store.code = update.state.doc.toString();
    }, 500);

    Store.editor = new EditorView({
      doc: Store.code,
      extensions: [
        basicSetup,
        langHtml({ extraTags: hints }),
        studioTheme,
        EditorView.updateListener.of((update: any) => {
          Store.cursorPos = update.state.selection.main.head;
          if(update.docChanged) {
            debouncedUpdate(update);
          }
        })
      ],
      parent: this.editorParent
    });
  }

  render() {
    return html`
      <div id="code-mirror-parent" style="resize: vertical;"></div>
    `;
  }
}
