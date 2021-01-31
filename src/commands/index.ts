import { Command, flags } from '@oclif/command';

export default class Index extends Command {
  static description = 'Prompt source'

  static hidden = true

  async run() {
    console.log('PROMPT');
  }
}
