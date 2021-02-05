import fetch from 'node-fetch';
import * as cheerio from 'cheerio';

const DEBUG = process.env.DEBUG;

interface StickerSourceConfig {
    filenameRegEx: RegExp;
    destination: string;

    sourceURL(id: string): string;
}

export class BrowserAdapter {
  config: StickerSourceConfig;

  $!: cheerio.Root;

  constructor(config: StickerSourceConfig) {
    this.config = config;
  }

  async navigate(param: string) {
    const url = this.config.sourceURL(param);

    try {
      const response = await fetch(url);
      const body = await response.text();

      this.$ = cheerio.load(body);
    } catch (error) {
      if (DEBUG) console.error(error);

      throw new Error(`Navigation to ${url} failed`);
    }
  }
}
