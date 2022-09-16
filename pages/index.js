import fs from 'fs';
import path from 'path';
import * as matter from 'gray-matter';
import { useEffect, useState } from 'react';
import { postFilePaths, postsPath } from '../utils/mdxUtils';
import HeroSection from '../components/home/HeroSection';
import TagFilter from '../components/blog/TagFilter';
import BlogList from '../components/blog/BlogList';

export default function Home({ posts }) {
  const [selectedTag, setSelectedTag] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const allTagsSet = posts.reduce((acc, post) => {
    return [...acc, ...post.frontmatter.tags];
  }, new Set(['all']));

  const allTagsArr = [...allTagsSet].sort((a, b) => a.localeCompare(b));

  useEffect(() => {
    if (selectedTag && selectedTag !== 'all') {
      setFilteredPosts(
        posts.filter((post) => post.frontmatter.tags.includes(selectedTag))
      );
    } else {
      setFilteredPosts(posts);
    }
  }, [selectedTag, posts]);

  return (
    <>
      <HeroSection />
      <TagFilter
        tags={allTagsArr}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <BlogList posts={filteredPosts} />
      {/* {filteredPosts.map((post) => (
        <div key={post.slug}>
          <Link href={`/blogs/${post.slug}`}>{post.frontmatter.title}</Link>
        </div>
      ))} */}
    </>
  );
}

export async function getStaticProps() {
  const posts = postFilePaths.map((slug) => {
    const filePath = fs.readFileSync(path.join(postsPath, `${slug}`));
    const { data } = matter(filePath);
    return {
      frontmatter: data,
      slug: slug.replace(/\.mdx?$/, ''),
    };
  });
  return {
    props: { posts: JSON.parse(JSON.stringify(posts)) },
  };
}
