import {EditorView} from "@codemirror/view"
import {Extension} from "@codemirror/state"
import {HighlightStyle, syntaxHighlighting} from "@codemirror/language"
import {tags as t} from "@lezer/highlight"

// Using https://github.com/one-dark/vscode-one-dark-theme/ as reference for the colors

const fontFamily = 'Helvetica, arial, sans-serif';
export const vars = {
  font: {
    family: {
      standard: fontFamily,
      code: 'Source Code Pro, Firacode, Hasklig, Menlo, monospace',
    },
    scale: {
      xsmall: `normal 10px ${fontFamily}`,
      small: `normal 12px ${fontFamily}`,
      standard: `normal 14px ${fontFamily}`,
      large: `normal 16px/1.3em ${fontFamily}`,
    },
    weight: {
      weak: '100',
      strong: '700',
    },
  },
  grid: '4px',
  radii: {
    small: '2px',
    medium: '4px',
    large: '6px',
    full: '100%',
  },
  codeGutterSize: '70px',
  touchableSize: '44px',
  transition: {
    slow: 'opacity 300ms ease, transform 300ms ease',
    medium: 'opacity 200ms ease, transform 200ms ease',
    fast: 'opacity 100ms ease, transform 100ms ease',
  },
  space: {
    none: '0',
    xxsmall: '2px',
    xsmall: '4px',
    medium: '6px',
    large: '12px',
    xlarge: '16px',
    xxlarge: '20px',
    gutter: '40px',
  },
};


const playroomPalette = {
  blue0: '#e5f3ff',
  blue1: '#0088ff',
  blue2: '#005ad2',
  blue3: '#00439c',
  blue4: '#040080',
  green1: '#c5f5e9',
  green2: '#1da584',
  red1: '#fee1e9',
  red2: '#e52b50',
  red3: '#cd193d',
  purple: '#75438a',
  white: '#fff',
  gray1: '#f4f4f4',
  gray2: '#e8e8e8',
  gray3: '#a7a7a7',
  gray4: '#767676',
  gray5: '#515151',
  gray6: '#1e1e1e',
  black: '#000',
};

export const light = {
  code: {
    text: playroomPalette.black,
    tag: playroomPalette.blue4,
    attribute: playroomPalette.blue2,
    string: playroomPalette.blue3,
    atom: playroomPalette.blue3,
    variable: playroomPalette.blue1,
    number: playroomPalette.purple,
  },
  foreground: {
    neutralSoft: playroomPalette.gray3,
    neutral: playroomPalette.gray5,
    neutralInverted: playroomPalette.white,
    secondary: playroomPalette.gray3,
    critical: playroomPalette.red3,
    accent: playroomPalette.blue2,
    positive: playroomPalette.green2,
  },
  background: {
    transparent: 'rgba(0, 0, 0, .05)',
    accent: playroomPalette.blue2,
    positive: playroomPalette.green1,
    critical: playroomPalette.red1,
    neutral: playroomPalette.gray6,
    surface: playroomPalette.white,
    body: playroomPalette.gray1,
    selection: playroomPalette.blue0,
  },
  border: {
    standard: playroomPalette.gray2,
  },
  shadows: {
    small: '0 2px 8px rgba(18, 21, 26, 0.3)',
    focus: `0 0 0 5px ${playroomPalette.blue0}`,
  },
};



const background = "#ffffff",
  highlightBackground = "gutter",
  primaryText = '#2e383c',
  gutter = '#1d75b3',
  selection = 'red',
  cursor = 'rgba(155,157,162,0.37)',

  keyword = '#1d75b3',
  comment = '#75787b',
  number = '#75438a',
  tag = '#9c3328',
  string = '#b35e14',
  variable = '#047d65';

/// The colors used in the theme, as CSS color strings.
export const color = {
  background,
  highlightBackground,
  primaryText,
  gutter,
  selection,
  cursor,

  keyword,
  comment,
  number,
  tag,
  string,
  variable
}

/// The editor theme styles for One Dark.
export const neoTheme = EditorView.theme({
  "&": {
    height: '100%',
    width: '100%',
    fontFamily: vars.font.family.code,
    position: 'relative',
    zIndex: 0,
  },

  ".cm-content": {
    caretColor: cursor
  },

  ".cm-cursor, .cm-dropCursor": {borderLeftColor: cursor},
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {backgroundColor: selection},

  ".cm-panels": {backgroundColor: background, color: primaryText},
  ".cm-panels.cm-panels-top": {borderBottom: "2px solid black"},
  ".cm-panels.cm-panels-bottom": {borderTop: "2px solid black"},

  ".cm-searchMatch": {
    backgroundColor: "#72a1ff59",
    outline: "1px solid #457dff"
  },
  ".cm-searchMatch.cm-searchMatch-selected": {
    backgroundColor: "#6199ff2f"
  },

  ".cm-activeLine": {backgroundColor: highlightBackground},
  ".cm-selectionMatch": {backgroundColor: "#aafe661a"},

  "&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket": {
    backgroundColor: "#bad0f847",
    outline: "1px solid #515a6b"
  },

  ".cm-gutters": {
    minWidth: vars.codeGutterSize,
    boxSizing: 'border-box',
    paddingLeft: '8px',
  },

  ".cm-activeLineGutter": {
    backgroundColor: highlightBackground
  },

  ".cm-foldPlaceholder": {
    color: light.foreground.accent,
    fontFamily: 'arial',
    cursor: 'pointer',
    padding: `0 ${vars.grid}`,
  },

  // ".cm-tooltip": {
  //   border: "none",
  //   backgroundColor: tooltipBackground
  // },
  // ".cm-tooltip .cm-tooltip-arrow:before": {
  //   borderTopColor: "transparent",
  //   borderBottomColor: "transparent"
  // },
  // ".cm-tooltip .cm-tooltip-arrow:after": {
  //   borderTopColor: tooltipBackground,
  //   borderBottomColor: tooltipBackground
  // },
  // ".cm-tooltip-autocomplete": {
  //   "& > ul > li[aria-selected]": {
  //     backgroundColor: highlightBackground,
  //     color: ivory
  //   }
  // }
})

// The highlighting style for code in the One Dark theme.
export const neoHighlightStyle = HighlightStyle.define([
  { tag: t.comment, color: comment},
  { tag: [t.keyword, t.propertyName], color: keyword},
  { tag: [t.atom, t.number], color: number},
  { tag: [t.tagName], color: tag},
  { tag: [t.string], color: string},
  { tag: [t.variableName], color: variable},
])

/// Extension to enable the One Dark theme (both the editor theme and
/// the highlight style).
export const neo: Extension = [ neoTheme, syntaxHighlighting(neoHighlightStyle)]
