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
    <img alt="GitHub Workflow Status" src="https://img.shields.io/github/actions/workflow/status/crashmax-dev/twallpaper/gh-pages.yaml?branch=master">
  </a>
  <a href="https://www.npmjs.com/package/twallpaper">
    <img alt="npm" src="https://img.shields.io/npm/v/twallpaper">
  </a>
  <a href="https://www.npmjs.com/package/twallpaper">
    <img alt="npm" src="https://img.shields.io/npm/dt/twallpaper?color=blue">
  </a>
  <a href="https://bundlephobia.com/package/twallpaper@latest">
    <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/twallpaper">
  </a>
</p>

## Features

 - 🔥 Zero [dependencies](https://www.npmjs.com/package/twallpaper?activeTab=dependents)
 - ⚙️ Flexible [configuration](#options-1)
 - 📦 Lightweight ([~2.5kB gzipped](https://bundlephobia.com/package/twallpaper))
 - 📜 Supports [TypeScript](https://www.typescriptlang.org) type definition

## Installation

```sh
npm install twallpaper
```

```sh
yarn add twallpaper
```

```sh
pnpm add twallpaper
```

## Demo

You can play with `twallpaper` on [twallpaper.js.org](https://twallpaper.js.org)

## Usage (vanilla)

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./.github/markdown-autodocs/usage.js) -->
<!-- The below code snippet is automatically added from ./.github/markdown-autodocs/usage.js -->
```js
import { TWallpaper } from 'twallpaper'
import 'twallpaper/css'

const container = document.querySelector('.tw-wrap')
const wallpaper = new TWallpaper(container, {
  /* options */
})
wallpaper.init()
```
<!-- MARKDOWN-AUTO-DOCS:END -->

<a href="https://codesandbox.io/s/twallpaper-typescript-example-1hwedw?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit twallpaper-typescript-example" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

## React

```sh
npm install @twallpaper/react
```

```sh
yarn add @twallpaper/react
```

```sh
pnpm add @twallpaper/react
```

<!-- MARKDOWN-AUTO-DOCS:START (CODE:src=./.github/markdown-autodocs/usage-react.js) -->
<!-- The below code snippet is automatically added from ./.github/markdown-autodocs/usage-react.js -->
```js
import { TWallpaper } from '@twallpaper/react'
import '@twallpaper/react/css'

export function App() {
  return <TWallpaper options={{ /* options */ }}/>
}
```
<!-- MARKDOWN-AUTO-DOCS:END -->

<a href="https://codesandbox.io/s/twallpaper-react-example-sl2sy0?fontsize=14&hidenavigation=1&theme=dark">
  <img alt="Edit twallpaper-react-example" src="https://codesandbox.io/static/img/play-codesandbox.svg">
</a>

## Vue

```sh
npm install @twallpaper/vue
```

```sh
yarn add @twallpaper/vue
```

```sh
pnpm add @twallpaper/vue
```

[![Edit @twallpaper/vue](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/compassionate-fog-wmhg4d?fontsize=14&hidenavigation=1&theme=dark)

## Using CDN
```html
<!-- JSDelivr  -->
<script src="https://cdn.jsdelivr.net/npm/twallpaper@latest/dist/index.umd.js"></script>

<!-- UNPKG -->
<script src="https://unpkg.com/twallpaper@latest/dist/index.umd.js"></script>
```

## API

### `.init(options?, container?)`
Initialize animation (before reinitializing, calls the `dispose()` method).

#### options
Type: [`TWallpaperOptions`](https://github.com/crashmax-dev/twallpaper/blob/master/packages/twallpaper/src/types.ts#L21-L28)

#### container
Type: `Element`

### `.animate(start?)`
Start or stop animation.

#### start
Type: `boolean`\
Default: `true`

### `.dispose()`
Destroy the instance wallpaper.

### `.scrollAnimate(start?)`
Start or stop mouse scroll animation.

#### start
Type: `boolean`\
Default: `false`

### `.toNextPosition(onNext?)`
Next animation position (animation turns off after use).

#### onNext
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
Type: [`PatternOptions`](https://github.com/crashmax-dev/twallpaper/blob/master/packages/twallpaper/src/types.ts#L12-L19)

### `.updateTails(tails?)`
Force update tails speed.

#### tails
Type: `number`\
Default `90`

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
