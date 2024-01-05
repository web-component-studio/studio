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
import { EditorState, Compartment } from '@codemirror/state';
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap } from '@codemirror/language';
import { history, defaultKeymap, historyKeymap, indentWithTab } from '@codemirror/commands';
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search';
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete';
import { lintKeymap } from '@codemirror/lint';
import { EditorView } from 'codemirror';
import { LanguageSupport } from '@codemirror/language';
import { parseMixed } from '@lezer/common';
import { htmlPlain, autoCloseTags, htmlLanguage, htmlCompletionSourceWith } from '@codemirror/lang-html';
import { javascriptLanguage } from '@codemirror/lang-javascript';

import { noctisLilac } from './studio-light-theme';
import { tokyoNightStorm } from './studio-dark-theme';

import codeEditorStyles from './code-editor.css';

const litHtml = () => {
  const lang = htmlPlain.configure({
    dialect: 'selfClosing',
    wrap: parseMixed((node, input) => {
      const isEmptyNode = () => node.to - node.from <= 2;
      if(node.name === 'Text') {
        const textOfNode = input.read(node.from, node.to);
        if(textOfNode.startsWith('${')) {
          return {
            parser: javascriptLanguage.parser
          }
        } else {
          return null;
        }
      } else if(node.name === 'AttributeValue' && !isEmptyNode()) {
        return {
          parser: javascriptLanguage.parser,
          overlay: [{from: node.from + 1, to: node.to - 1}]
        }
      }

      return null;
    })
  });
  return new LanguageSupport(lang, [
    htmlLanguage.data.of({autocomplete: htmlCompletionSourceWith({ extraTags: hints})}),
    autoCloseTags
  ]);
}

const theme = new Compartment;

const debouncedUpdate = debounce((update: any) => {
  Store.code = update.state.doc.toString();
}, 500);

const studioEditorState = EditorState.create({
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
    // langHtml({ extraTags: hints, autoCloseTags: true }),
    litHtml(),
    // studioTheme,
    theme.of(Store.darkMode === 'dark' ? tokyoNightStorm : noctisLilac),
    EditorView.updateListener.of((update: any) => {
      Store.cursorPos = update.state.selection.main.head;
      if(update.docChanged) {
        debouncedUpdate(update);
      }
    })
  ],
})

declare global {
  interface HTMLElementTagNameMap {
    'code-editor': CodeEditor
  }
}

@customElement('studio-code-editor')
export class CodeEditor extends LitElement {
  static styles = [ codeEditorStyles];

  @query('#code-mirror-parent') editorParent?: HTMLTextAreaElement;

  connectedCallback(): void {
    super.connectedCallback();
    Store.attach(this);
  }

  firstUpdated() {
    Store.editor = new EditorView({
      state: studioEditorState,
      parent: this.editorParent
    });
  }

  // willUpdate() {
  //   if(Store.darkMode === 'dark') {
  //     Store.editor?.dispatch({
  //       effects: theme.reconfigure(theme.of(tokyoNightStorm))
  //     });
  //   } else if(Store.darkMode === 'light') {
  //     Store.editor?.dispatch({
  //       effects: theme.reconfigure(theme.of(noctisLilac))
  //     });
  //   }
  // }

  render() {
    return html`
      <div id="code-mirror-parent" style="resize: vertical;" aria-label="Studio code editor. Press Escape then Tab to leave the editor."></div>
    `;
  }
}
