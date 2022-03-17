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
 - ⚙️ Flexible [configuration](#options)
 - 📦 Lightweight ([~2.3kB gzipped](https://bundlephobia.com/package/twallpaper))
 - 📜 Supports [TypeScript](https://www.typescriptlang.org) type definition

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
```
<!-- MARKDOWN-AUTO-DOCS:END -->

## Options

<!-- MARKDOWN-AUTO-DOCS:START (JSON_TO_HTML_TABLE:src=./.github/markdown-autodocs/options.json) -->
<table class="JSON-TO-HTML-TABLE"><thead><tr><th class="key-th">Key</th><th class="type-th">Type</th><th class="default-th">Default</th><th class="description-th">Description</th></tr></thead><tbody ><tr ><td class="key-td td_text">colors</td><td class="type-td td_text"><code>string[]</code></td><td class="default-td td_num"></td><td class="description-td td_text">Colors for gradient, use 1-4 full hex codes.</td></tr>
<tr ><td class="key-td td_text">pattern</td><td class="type-td td_text"><code>string</code></td><td class="default-td td_num"></td><td class="description-td td_text">Wallpaper image. Use the standard <a href='https://github.com/crashmax-dev/twallpaper/tree/master/public/patterns'>pattern</a> or create your own.</td></tr>
<tr ><td class="key-td td_text">blur</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>0</code></td><td class="description-td td_text">Required wallpaper image (pattern). The property is applied using a css rule.</td></tr>
<tr ><td class="key-td td_text">opacity</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>0.3</code></td><td class="description-td td_text">Required wallpaper image (pattern). The property is applied using a css rule.</td></tr>
<tr ><td class="key-td td_text">fps</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>30</code></td><td class="description-td td_text">Frame time is just the time between frames.</td></tr>
<tr ><td class="key-td td_text">tails</td><td class="type-td td_text"><code>number</code></td><td class="default-td td_text"><code>90</code></td><td class="description-td td_text">Tail speed animation.</td></tr>
<tr ><td class="key-td td_text">animate</td><td class="type-td td_text"><code>boolean</code></td><td class="default-td td_text"><code>true</code></td><td class="description-td td_text">The main parameter responsible for the operation of the animation.</td></tr>
<tr ><td class="key-td td_text">scrollAnimate</td><td class="type-td td_text"><code>boolean</code></td><td class="default-td td_text"><code>true</code></td><td class="description-td td_text">The animation is tied to scrolling with the mouse wheel.</td></tr></tbody></table>
<!-- MARKDOWN-AUTO-DOCS:END -->
