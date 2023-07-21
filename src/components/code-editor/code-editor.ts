import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { Store } from '../../store/store';
import { debounce } from '../../utils';
import { hints } from '../../hints';

import {
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  highlightActiveLine,
  keymap
} from '@codemirror/view';
import { EditorState } from '@codemirror/state';
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap } from '@codemirror/language';
import { history, defaultKeymap, historyKeymap, indentWithTab } from '@codemirror/commands';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { lintKeymap } from '@codemirror/lint';

import { EditorView } from 'codemirror';
import { html as langHtml } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';

import { studioTheme } from './studio-theme';



import codeEditorStyles from './code-editor.css';

declare global {
  interface HTMLElementTagNameMap {
    'code-editor': CodeEditor
  }
}

@customElement('studio-code-editor')
export class CodeEditor extends LitElement {
  static styles = [ codeEditorStyles];

  @query('#code-mirror-parent') editorParent?: HTMLTextAreaElement;

  firstUpdated() {
    const debouncedUpdate = debounce((update: any) => {
      Store.code = update.state.doc.toString();
    }, 500);

    Store.editor = new EditorView({
      doc: Store.code,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter({
          openText: '—',
          closedText: '+'
        }),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        indentOnInput(),
        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        crosshairCursor(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...searchKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
            ...lintKeymap,
            indentWithTab
        ]),
        EditorView.lineWrapping,
        langHtml({ extraTags: hints }),
        javascript(),
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
      <div id="code-mirror-parent" style="resize: vertical;" aria-label="Studio code editor. Press Escape then Tab to leave the editor."></div>
    `;
  }
}
