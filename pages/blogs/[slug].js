import React from 'react';
import path from 'path';
import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import { postFilePaths } from '../../utils/mdxUtils';

export default function SingleBlog({ MdxSource }) {
  return (
    <div>
      <MDXRemote {...MdxSource} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(process.cwd(), 'posts', `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const MdxSource = await serialize(fileContent);
  return {
    props: {
      slug,
      MdxSource,
    },
  };
}

export async function getStaticPaths() {
  const postsPaths = postFilePaths.map((slug) => ({
    params: {
      slug: slug.replace(/\.mdx?$/, ''),
    },
  }));

  return {
    paths: postsPaths,
    fallback: false,
  };
}
