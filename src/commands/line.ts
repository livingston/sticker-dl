import { Command, flags } from '@oclif/command';

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
  }
}
