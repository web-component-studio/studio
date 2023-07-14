import {EditorView} from '@codemirror/view';
import {Extension} from '@codemirror/state'
import {HighlightStyle, syntaxHighlighting} from '@codemirror/language'
import {tags as t} from '@lezer/highlight'

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors

const chalky = '#e5c07b',
  coral = '#e06c75',
  cyan = '#56b6c2',
  invalid = '#ffffff',
  ivory = '#abb2bf',
  stone = '#7d8799', // Brightened compared to original to increase contrast
  malibu = '#61afef',
  sage = '#98c379',
  whiskey = '#d19a66',
  violet = '#c678dd',
  darkBackground = '#21252b',
  highlightBackground = '#2c313a',
  background = '#282c34',
  tooltipBackground = '#353a42',
  selection = '#3E4451',
  cursor = '#528bff'

/// The colors used in the theme, as CSS color strings.
export const color = {
  chalky,
  coral,
  cyan,
  invalid,
  ivory,
  stone,
  malibu,
  sage,
  whiskey,
  violet,
  darkBackground,
  highlightBackground,
  background,
  tooltipBackground,
  selection,
  cursor
}

/// The editor theme styles for One Dark.
export const studioThemeBase = EditorView.theme({
  '&': {
    color: 'var(--studio-color-editor-text-neutral)',
    backgroundColor: 'var(--studio-color-background)',
    fontSize: '1.1rem',
  },

  '.cm-content': {
    fontFamily: 'var(--studio-font-mono)',
    caretColor: cursor
  },

  '.cm-cursor, .cm-dropCursor': {borderLeftColor: cursor},
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: '#6699ff44'
  },

  '.cm-panels': {backgroundColor: darkBackground, color: ivory},
  '.cm-panels.cm-panels-top': {borderBottom: '2px solid black'},
  '.cm-panels.cm-panels-bottom': {borderTop: '2px solid black'},

  '.cm-searchMatch': {
    backgroundColor: '#72a1ff59',
    outline: '1px solid #457dff'
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: '#6199ff2f'
  },

  '.cm-activeLine': {backgroundColor: '#6699ff0b'},
  '.cm-selectionMatch': {
    backgroundColor: '#6699ff44'
  },

  '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
    backgroundColor: '#bad0f847'
  },

  '.cm-gutters': {
    backgroundColor: 'var(--studio-color-editor-background)',
    color: 'var(--studio-color-editor-text-neutral)',
    border: 'none'
  },
  '.cm-gutter:not(.cm-foldGutter)': {
    minWidth: '50px',
  },
  '.cm-foldGutter': {
    width: '20px',
  },
  '.cm-activeLineGutter': {
    backgroundColor: 'transparent'
  },

  '.cm-foldPlaceholder': {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ddd'
  },

  '.cm-tooltip': {
    border: 'none',
    backgroundColor: tooltipBackground
  },
  '.cm-tooltip .cm-tooltip-arrow:before': {
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  '.cm-tooltip .cm-tooltip-arrow:after': {
    borderTopColor: tooltipBackground,
    borderBottomColor: tooltipBackground
  },
  '.cm-tooltip-autocomplete': {
    '& > ul > li[aria-selected]': {
      backgroundColor: highlightBackground,
      color: ivory
    }
  }
}, {dark: true})

/// The highlighting style for code in the One Dark theme.
export const studioThemeHighlightStyle = HighlightStyle.define([
  { tag: t.comment, color: 'var(--studio-color-editor-comment)'},
  { tag: [t.tagName, t.bracket], color: 'var(--studio-color-editor-html-tags)'},
  { tag: t.attributeName, color: 'var(--studio-color-editor-attribute-name)'},
  { tag: t.attributeValue, color: 'var(--studio-color-editor-attribute-value)'},
  { tag: t.operator, color: 'red'},
])

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const studioTheme: Extension = [studioThemeBase, syntaxHighlighting(studioThemeHighlightStyle)]
