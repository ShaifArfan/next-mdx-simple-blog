import path from 'path';
import fs from 'fs';

export const postsPath = path.join(process.cwd(), 'posts');
export const postFileNames = fs
  .readdirSync(postsPath)
  .filter((postPath) => /\.mdx?$/.test(postPath));
