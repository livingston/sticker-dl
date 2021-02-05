import * as https from 'https';
import * as os from 'os';
import * as fse from 'fs-extra';

import type { IncomingMessage } from 'http';

interface DownloadOptions {
  url: string;
  dest: string;
  filename: string;
  ext: string;
}

const HOME_DIR = os.homedir();

export function resolveTilde(pathWithTilde: string) {
  if (typeof pathWithTilde !== 'string') {
    throw new TypeError(`Expected a string, got '${typeof pathWithTilde}'`);
  }

  if (HOME_DIR) {
    return pathWithTilde.replace(/^~(?=$|\/|\\)/, HOME_DIR);
  }

  return pathWithTilde;
}

export function downloadSticker({ url, dest, filename, ext }: DownloadOptions) {
  const fname = `${dest}/${filename}.${ext}`;

  return new Promise((resolve, reject) => {
    const file = fse.createWriteStream(fname);

    https.get(url, (response: IncomingMessage) => {
      response.pipe(file);

      file.on('finish', async () => {
        await file.close();
        resolve(true)
      });
    }).on('error', error => {
      fse.unlink(fname);

      reject(error.message);
    });
  });
}
