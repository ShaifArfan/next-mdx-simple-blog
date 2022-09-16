import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Text from '../typography/Text';
import classes from './BlogList.module.scss';

function BlogItemCard({ post }) {
  return (
    <div className={classes.item}>
      {post.frontmatter.bannerUrl && (
        <div className={classes.bannerImg}>
          <Image
            src={post.frontmatter.bannerUrl}
            alt={post.frontmatter.title}
            objectFit="cover"
            layout="fill"
          />
        </div>
      )}
      <Link href={`/blogs/${post.slug}`}>
        <a className={classes.blogTitle}>{post.frontmatter.title}</a>
      </Link>
      {post.frontmatter.date && (
        <Text className={classes.blogDate}>
          {format(new Date(post.frontmatter.date), 'PPP')}
        </Text>
      )}
      {post.frontmatter.tags && (
        <Text className={classes.tags}>
          Tags:{' '}
          {post.frontmatter.tags.map((tag, index, tags) => (
            <span key={tag}>
              {tag}
              {tags.length - 1 > index ? ', ' : ''}
            </span>
          ))}
        </Text>
      )}
      {post.frontmatter.description && (
        <Text className={classes.description}>
          {post.frontmatter.description}
        </Text>
      )}
    </div>
  );
}

function BlogList({ posts }) {
  return (
    <div className={classes.container}>
      {posts.map((post) => (
        <BlogItemCard post={post} key={post.slug} />
      ))}
    </div>
  );
}

export default BlogList;
