<br>
<p align="center">
  <a href="https://twallpaper.js.org">
    <img height="220" src="https://twallpaper.js.org/utya.webp"/>
    <br/>
    <h1 align="center">TWallpaper</h1>
  </a>
</p>

<p align="center">
  <b>🌈 Multicolor gradient wallpaper created algorithmically and shimmers smoothly.</b>
</p>

<p align="center">
  <a href="https://github.com/crashmax-dev/twallpaper/actions">
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/crashmax-dev/twallpaper/github-pages">
  </a>
  <a href="https://www.npmjs.com/package/twallpaper">
    <img alt="npm" src="https://img.shields.io/npm/v/twallpaper">
  </a>
  <a href="https://www.npmjs.com/package/twallpaper">
    <img alt="npm" src="https://img.shields.io/npm/dt/twallpaper?color=blue">
  </a>
  <a href="https://bundlephobia.com/package/twallpaper@latest">
    <img alt="npm bundle size" src="https://badgen.net/bundlephobia/minzip/twallpaper">
  </a>
</p>

## Features

 - 🔥 Zero [dependencies](https://www.npmjs.com/package/twallpaper?activeTab=dependents)
 - ⚙️ Flexible [configuration](#options-1)
 - 📦 Lightweight ([~2.5kB gzipped](https://bundlephobia.com/package/twallpaper))
 - 📜 Supports [TypeScript](https://www.typescriptlang.org) type definition

## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Edge / IE | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>iOS Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Opera | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/yandex/yandex_48x48.png" alt="Yandex" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)<br/>Yandex |
| --------- | --------- | --------- | --------- | --------- | --------- | --------- |
| ✔ , IE11 (partial) | ✔ | ✔ | ✔ | ✔ | ✔ | ✔

## Installation

```sh
# with npm:
npm install twallpaper

# or yarn:
yarn add twallpaper
```

## Demo

You can play with `twallpaper` on [twallpaper.js.org](https://twallpaper.js.org)

<p align="left">
  <a href="https://codesandbox.io/s/twallpaper-typescript-example-1hwedw?fontsize=14&hidenavigation=1&theme=dark">
    <img alt="Edit twallpaper-typescript-example" src="https://img.shields.io/badge/TypeScript-informational?label=CodeSandbox&style=flat&logo=CodeSandbox&logoColor=ffffff&color=2286f7">
  </a>
  <a href="https://codesandbox.io/s/twallpaper-react-example-sl2sy0?fontsize=14&hidenavigation=1&theme=dark">
    <img alt="Edit twallpaper-react-example" src="https://img.shields.io/badge/React-informational?label=CodeSandbox&style=flat&logo=CodeSandbox&logoColor=ffffff&color=2286f7">
  </a>
</p>

## Usage

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./.github/markdown-autodocs/usage.js) -->
<!-- The below code snippet is automatically added from ./.github/markdown-autodocs/usage.js -->
```js
import { TWallpaper } from 'twallpaper'

const container = document.querySelector('.tw-wrap')
const wallpaper = new TWallpaper(container, { /* options */ })
wallpaper.init()
```
<!-- MARKDOWN-AUTO-DOCS:END -->

## Using CDN
```html
<!-- JSDelivr  -->
<script src="https://cdn.jsdelivr.net/npm/twallpaper@latest/dist/twallpaper.umd.js"></script>

<!-- UNPKG -->
<script src="https://unpkg.com/twallpaper@latest/dist/twallpaper.umd.js"></script>
```

## API

### `.init(options?, container?)`
Re/initilize animation (before reinitializing, calls the `dispose()` method).

#### options
Type: [`TWallpaperOptions`](https://github.com/crashmax-dev/twallpaper/blob/master/src/twallpaper.ts#L23-L30)

#### container
Type: [`Container`](https://github.com/crashmax-dev/twallpaper/blob/master/src/twallpaper.ts#L12)

### `.animate(start?)`
Start/stop animation.

#### start
Type: `boolean`\
Default: `true`

### `.dispose()`
Destroy the instance wallpaper.

### `.scrollAnimate(start?)`
Start/stop mouse scroll animation.

#### start
Type: `boolean`\
Default: `false`

### `.toNextPosition(callback?)`
Next animation position (animation turns off after use).

#### callback
Execution `toNextPosition` is finished.\
Type: `function`

### `.updateColors(colors)`
Force update colors.

#### colors
Type: `string[]`

### `.updateFrametime(fps?)`
Force update frametime.

#### fps
Type: `number`\
Default: `30`

### `.updatePattern(pattern)`
Force update pattern options.

#### pattern
Type: [`PatternOptions`](https://github.com/crashmax-dev/twallpaper/blob/master/src/twallpaper.ts#L14-L21)

### `.updateTails(tails?)`
Force update tails speed.

#### tails
Type: `number`\
Default `90`

### `.generateColors(length?)`
Generation of colors up to 4 by default.

#### length
Type: `number`

## Options

<!-- MARKDOWN-AUTO-DOCS:START (JSON_TO_HTML_TABLE:src=./.github/markdown-autodocs/options.json) -->
<table class="JSON-TO-HTML-TABLE"><thead><tr><th class="key-th">Key</th><th class="type-th">Type</th><th class="default-th">Default</th><th class="description-th">Description</th></tr></thead><tbody ><tr ><td class="key-td td_text">colors</td><td class="type-td td_text"><code>string[]</code></td><td class="default-td td_num"></td><td class="description-td td_text">Colors for gradient, use 1-4 full hex codes. This parameter is enough to make the fantastic gradient work.</td></tr>
<tr ><td class="key-td td_text">fps</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>30</code></td><td class="description-td td_text">Frame time is just the time between frames.</td></tr>
<tr ><td class="key-td td_text">tails</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>90</code></td><td class="description-td td_text">Tail speed animation.</td></tr>
<tr ><td class="key-td td_text">animate</td><td class="type-td td_text"><code>boolean</code></td><td class="default-td td_text"><code>true</code></td><td class="description-td td_text">The main parameter responsible for the operation of the animation.</td></tr>
<tr ><td class="key-td td_text">scrollAnimate</td><td class="type-td td_text"><code>boolean</code></td><td class="default-td td_text"><code>false</code></td><td class="description-td td_text">The animation is tied to scrolling with the mouse wheel.</td></tr>
<tr ><td class="key-td td_text">pattern</td><td class="type-td td_text"><code><a href='https://github.com/crashmax-dev/twallpaper/blob/master/src/twallpaper.ts#L14-L21'>PatternOptions</a></code></td><td class="default-td td_num"></td><td class="description-td td_text">Pattern options.</td></tr>
<tr ><td class="key-td td_text">pattern.image</td><td class="type-td td_text"><code>string</code></td><td class="default-td td_num"></td><td class="description-td td_text">Wallpaper image. Use standard <a href='https://github.com/crashmax-dev/twallpaper/tree/master/public/patterns'>pattern</a> or create your own.</td></tr>
<tr ><td class="key-td td_text">pattern.mask</td><td class="type-td td_text"><code>boolean</code></td><td class="default-td td_text"><code>false</code></td><td class="description-td td_text">Option enables a mask for the background image using the <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/mask-image'>mask-image</a> css-property.</td></tr>
<tr ><td class="key-td td_text">pattern.background</td><td class="type-td td_text"><code>string</code></td><td class="default-td td_text"><code>#000</code></td><td class="description-td td_text">Specify the mask color in hex format. Background does not work when <code>mask</code> is enabled.</td></tr>
<tr ><td class="key-td td_text">pattern.size</td><td class="type-td td_text"><code>string</code></td><td class="default-td td_text"><code>auto</code></td><td class="description-td td_text">Image background size.</td></tr>
<tr ><td class="key-td td_text">pattern.blur</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>0</code></td><td class="description-td td_text">Applies to the pattern image. Blur does not work when <code>mask</code> is enabled.</td></tr>
<tr ><td class="key-td td_text">pattern.opacity</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>0.5</code></td><td class="description-td td_text">Applies to the pattern image.</td></tr></tbody></table>
<!-- MARKDOWN-AUTO-DOCS:END -->
