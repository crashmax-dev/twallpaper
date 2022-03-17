<br>
<p align="center">
  <a href="https://crashmax-dev.github.io/twallpaper/">
    <img height="240" src="https://crashmax-dev.github.io/twallpaper/utya.gif"/>
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

 - Vanilla\
  [![Edit twallpaper-typescript-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/twallpaper-typescript-example-1hwedw?fontsize=14&hidenavigation=1&theme=dark)

 - React\
  [![Edit twallpaper-react-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/twallpaper-react-example-sl2sy0?fontsize=14&hidenavigation=1&theme=dark)


## Usage

```js
import { TWallpaper } from 'twallpaper'

const container = document.querySelector('.wallpaper-container')
const wallpaper = new TWallpaper(container, { /* options */ })
```

## Options
