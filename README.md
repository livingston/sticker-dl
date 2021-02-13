# cli to download stickers

[![License](https://img.shields.io/github/license/livingston/sticker-dl)](https://github.com/livingston/sticker-dl/blob/main/LICENSE)
[![npm](https://img.shields.io/npm/v/sticker-dl)](https://www.npmjs.com/package/sticker-dl)
[![node-lts](https://img.shields.io/node/v-lts/sticker-dl)](https://www.npmjs.com/package/sticker-dl)

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://www.typescriptlang.org/)

You can use this cli to download **Line** stickers

## Installation

```sh-session
$ npm install -g sticker-dl
```

## Download Line stickers

```sh-session
$ sticker-dl line STICKERID
```

`STICKEID` is the number portion of the Line sticker URL.

For. eg. if the sticker url is `https://store.line.me/stickershop/product/123/en`

Run,
```sh-session
$ sticker-dl line 123
```


## Commands
```
USAGE
  $ sticker-dl line STICKERID

OPTIONS
  --dest=dest  destination to download the stickers

EXAMPLE
  $ sticker-dl line STICKERID
```


### Disclaimer

This is meant for personal use only.
