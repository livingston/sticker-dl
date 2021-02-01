import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';

import type { Browser, Page } from 'puppeteer';

const DEBUG = process.env.DEBUG;

// eslint-disable-next-line new-cap
puppeteer.use(StealthPlugin());
// eslint-disable-next-line new-cap
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

interface StickerSourceConfig {
    filenameRegEx: RegExp;
    desitnation: string;

    sourceURL(id: string): string;
}

export class BrowserAdapter {
  config: StickerSourceConfig;

  browser!: Browser;

  page!: Page;

  constructor(config: StickerSourceConfig) {
    this.config = config;
  }

  async launch() {
    this.browser = await puppeteer.launch();
    this.page = await this.browser.newPage();
  }

  async navigate(param: string) {
    const url = this.config.sourceURL(param);

    try {
      await this.page.goto(url);
    } catch (error) {
      if (DEBUG) console.error(error);

      throw new Error(`Navigation to ${url} failed`);
    }
  }

  async close() {
    await this.browser.close();
  }
}
