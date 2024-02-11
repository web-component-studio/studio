![studio](https://user-images.githubusercontent.com/8377369/184551761-8ee9ed74-9b10-4d4e-bf8c-e5cc7fd46892.png)


# studio
A web component playroom application for web component design systems.


## Examples

- [Shoelace](https://shoelace.wcstudio.dev) - [repo](https://github.com/)


## Getting Started

First install the `wc-studio` package:

```bash
$ npm install wc-studio --save-dev

$ pnpm install wc-studio
```

Then add the CLI scripts to your `package.json` scripts:

```json
{
  scripts: {
    "studio:start": "wc-studio start",
    "studio:build": "wc-studio build"
  }
}
```

### ES Modules

`wc-studio` is distributed as a modern JS package and as an ES module package. Configuring `wc-studio` will require ES module format (export syntax) so it is a good idea to also make sure the `package.json` of your project has `"type": "module"` so that nodeJS will treat all `.js` files in your project as ES module imports.

## Configuration

`wc-studio` needs some configuration to get up and running. So add a `studio.config.js` file to the root of your project.

Here is a short version of the config. A detailed explanation of configuration properties is [further below](#configuration-detail):

```js
export default {
  components: './src/components.js',
  customHints: './src/hints.js',
  snippets: './src/snippets.js',
  outputPath: './dist',
  publicAssetsRoots: [
    {
      src: './node_modules/@shoelace-style/shoelace/dist/assets/icons/*',
      dest: 'shoelace/assets/icons'
    }
  ],
  darkModeCallback: (newMode) => {
    document.documentElement.classList.remove(`sl-theme-dark`);
    document.documentElement.classList.remove(`sl-theme-light`);

    if(newMode !== 'system') {
      document.documentElement.classList.add(`sl-theme-${newMode}`);
    } else {
      const darkMode = matchMedia('(prefers-color-scheme: dark)');
      document.documentElement.classList.add(`sl-theme-${darkMode.matches ? 'dark' : 'light'}`);
    }
  },
  initialMode: 'dark',
  port: 9000,
  openBrowser: true,
  paramType: 'search',
  favicon: './src/images/favicon.svg',
  widths: [320, 600, 960, 1028, 1200],
  exampleCode: `<p>this is an example</p>`,
  iframeSandbox: 'allow-scripts allow-same-origin',
}
```


## Components

## Snippets

## Hints

## Custom frame component


## Configuration detail
