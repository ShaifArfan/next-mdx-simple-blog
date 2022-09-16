import { format } from 'date-fns';
import Image from 'next/image';
import React from 'react';
import Heading from '../typography/Heading';
import Text from '../typography/Text';
import classes from './BlogHeader.module.scss';

function BlogHeader({ frontmatter }) {
  return (
    <div>
      {frontmatter.bannerUrl && (
        <div className={classes.bannerImg}>
          <Image
            src={frontmatter.bannerUrl}
            alt={frontmatter.title}
            objectFit="cover"
            layout="fill"
          />
        </div>
      )}
      <Heading>{frontmatter.title}</Heading>
      {frontmatter.date && (
        <Text className={classes.blogDate}>
          {format(new Date(frontmatter.date), 'PPP')}
        </Text>
      )}
      {frontmatter.tags && (
        <Text className={classes.tags}>
          Tags:{' '}
          {frontmatter.tags.map((tag, index, tags) => (
            <span key={tag}>
              {tag}
              {tags.length - 1 > index ? ', ' : ''}
            </span>
          ))}
        </Text>
      )}
      {frontmatter.description && (
        <Text className={classes.description}>
          Description: {frontmatter.description}
        </Text>
      )}
    </div>
  );
}

export default BlogHeader;
