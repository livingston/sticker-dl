import { Command } from '@oclif/command';

import { fetchLineStickers } from '../lib/line';

export default class Line extends Command {
  static description = 'Download "line" stickers'

  static examples = ['$ sticker-dl line STICKERID']

  static args = [
    {
      name: 'stickerId',
      required: true,
    },
  ]

  async run() {
    const { args: { stickerId } } = this.parse(Line);

    await fetchLineStickers(stickerId);
  }
}
