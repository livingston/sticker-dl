import path from 'path';

import Listr from 'listr';
import fse from 'fs-extra';
import { green, bold, white, yellowBright } from 'colorette';

import { BrowserAdapter } from '../BrowserAdapter';
import { downloadSticker } from '../utils';

import type { ListrContext, ListrTaskWrapper } from 'listr';

const Selectors = {
  StickerItem: '.FnStickerPreviewItem',
  StickerTitle: '[data-test="sticker-name-title"]',
};

const StickerSourceConfig = {
  filenameRegEx: /sticker\/(\d+)\/(iPhone|android)/,
  destination: './downloads',

  sourceURL: (id: string) => `https://store.line.me/stickershop/product/${id}/en`,
}

export const fetchLineStickers = async (stickerId: string, downloadDestination: string | undefined) => {
  const tasks = new Listr([
    {
      title: 'Sticker details',
      task: async (ctx: ListrContext, task: ListrTaskWrapper) => {
        task.output = 'Loading page…';

        const browser = new BrowserAdapter(StickerSourceConfig);
        await browser.navigate(stickerId);

        ctx.stickerTitle = browser.$(Selectors.StickerTitle).text();

        ctx.stickerList = browser.$(Selectors.StickerItem).map((i, el) => {
          const data = browser.$(el).data('preview');

          if (data.type === 'animation') return data.animationUrl;
          if (data.type === 'popup') return data.popupUrl;

          return data.staticUrl;
        }).get();

        task.output = `Found ${ctx.stickerList.length} stickers`;
      },
    },
    {
      title: 'Download Sticker pack',
      task: async (ctx: ListrContext, task: ListrTaskWrapper) => {
        task.output = 'Downloading…';

        let exportPath = StickerSourceConfig.destination;

        if (downloadDestination) {
          const downloadPath = path.resolve(downloadDestination);
          exportPath = downloadPath;
        }

        const dest = path.join(exportPath, ctx.stickerTitle);
        await fse.ensureDir(dest);

        const downloads = [];

        for (const stickerURL of ctx.stickerList) {
          const filename = stickerURL.match(StickerSourceConfig.filenameRegEx)?.[1];

          if (filename) {
            downloads.push(
              downloadSticker({
                url: stickerURL,
                dest,
                filename,
                ext: 'png',
              }),
            );
          }
        }

        await Promise.all(downloads);
      },
    },
  ]);

  const { stickerTitle, stickerList } = await tasks
  .run()
  .catch(() => {
    process.exit(1);
  });

  console.log();
  console.log(green(`    Downloaded "${bold(white(stickerTitle))}" pack with ${bold(yellowBright(stickerList.length))} stickers`));
  console.log();
};
