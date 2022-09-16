import React from 'react';
import path from 'path';
import fs from 'fs';
import { serialize } from 'next-mdx-remote/serialize';
import matter from 'gray-matter';
import rehypeHighlight from 'rehype-highlight';
import { postFilePaths, postsPath } from '../../utils/mdxUtils';
import SingleBlog from '../../components/blog/SingleBlog';

export default function SingleBlogPage({ ...props }) {
  return <SingleBlog {...props} />;
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const filePath = path.join(postsPath, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { content, data: frontmatter } = matter(fileContent);
  const MdxSource = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeHighlight],
    },
  });
  return {
    props: {
      slug,
      MdxSource,
      frontmatter: JSON.parse(JSON.stringify(frontmatter)),
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
