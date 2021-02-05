import { Command, flags } from '@oclif/command';

import { fetchLineStickers } from '../tasks/line';
import { resolveTilde } from '../utils';

export default class Line extends Command {
  static description = 'Download "line" stickers'

  static examples = ['$ sticker-dl line STICKERID']

  static args = [
    {
      name: 'stickerId',
      required: true,
    },
  ]

  static flags = {
    dest: flags.string({
      description: 'destination to download the stickers',
      multiple: false,
      required: false,
    }),
  }

  async run() {
    const {
      args: { stickerId },
      flags,
    } = this.parse(Line);

    let dest = flags.dest;

    if (dest) {
      dest = resolveTilde(dest);
    }

    await fetchLineStickers(stickerId, dest);
  }
}
