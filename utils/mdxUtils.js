import path from 'path';
import fs from 'fs';

export const postsPath = path.join(process.cwd(), 'posts');
export const postFilePaths = fs
  .readdirSync(postsPath)
  .filter((postPath) => /\.mdx?$/.test(postPath));
