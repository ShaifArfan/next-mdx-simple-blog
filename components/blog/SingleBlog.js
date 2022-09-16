import Link from 'next/link';
import React from 'react';
import { LeftArrow, UpArrow } from '../icons';
import BlogContent from './BlogContent';
import BlogHeader from './BlogHeader';
import classes from './SingleBlog.module.scss';

function SingleBlog({ MdxSource, frontmatter }) {
  return (
    <div className={classes.blogContainer}>
      <Link href="/">
        <a className={classes.link}>
          <LeftArrow />
          Home
        </a>
      </Link>
      <BlogHeader frontmatter={frontmatter} />
      <BlogContent MdxSource={MdxSource} />
      <button
        className={classes.scrollToTop}
        type="button"
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        Scroll To Top
        <UpArrow />
      </button>
    </div>
  );
}

export default SingleBlog;
