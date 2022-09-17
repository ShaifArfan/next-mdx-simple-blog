import fs from 'fs';
import path from 'path';
import * as matter from 'gray-matter';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { postFilePaths, postsPath } from '../utils/mdxUtils';
import HeroSection from '../components/home/HeroSection';
import TagFilter from '../components/blog/TagFilter';
import BlogList from '../components/blog/BlogList';

export default function Home({ posts }) {
  const postPerPage = 3;
  const [currentPage, setCurrentPage] = useState(null);
  const router = useRouter();
  const [selectedTag, setSelectedTag] = useState('all');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  const allTagsSet = posts.reduce((acc, post) => {
    post.frontmatter.tags?.map((tag) => acc.add(tag));
    return acc;
  }, new Set([]));

  const allTagsArr = [...allTagsSet].sort((a, b) => a.localeCompare(b));
  allTagsArr.unshift('all');

  useEffect(() => {
    const page = parseInt(router.query.page, 10) || 1;
    let tempPosts = [...posts];
    if (selectedTag && selectedTag !== 'all') {
      tempPosts = posts.filter((post) =>
        post.frontmatter.tags.includes(selectedTag)
      );
    }
    if (router.query) {
      setCurrentPage(page || 1);
      const start = (page - 1) * postPerPage;
      const end =
        start + postPerPage > posts.length - 1
          ? posts.length
          : start + postPerPage;
      const paginatedPosts = tempPosts.slice(start, end);
      setFilteredPosts(paginatedPosts);
      setCurrentPage(page);
    }
  }, [selectedTag, posts, router]);

  const totalPages =
    selectedTag === 'all'
      ? Math.ceil(posts.length / postPerPage)
      : Math.ceil(filteredPosts.length / postPerPage);

  return (
    <>
      <HeroSection />
      <TagFilter
        tags={allTagsArr}
        selectedTag={selectedTag}
        setSelectedTag={setSelectedTag}
      />
      <BlogList posts={filteredPosts} />

      <div className="pagination">
        <h3 className="pagination_heading">
          page {router.query.page || 1} out of {totalPages}
        </h3>
        <div className="paginateLinks_container">
          {currentPage > 1 && (
            <Link href={`/?page=${currentPage - 1}`}>
              <a className="paginateLinks">Prev</a>
            </Link>
          )}
          {currentPage < totalPages && (
            <Link href={`/?page=${currentPage + 1}`}>
              <a className="paginateLinks">Next</a>
            </Link>
          )}
        </div>
      </div>
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
