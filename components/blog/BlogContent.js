import { MDXRemote } from 'next-mdx-remote';
import React from 'react';
import Image from 'next/image';
import classes from './BlogContent.module.scss';
import Text from '../typography/Text';
import Heading from '../typography/Heading';

const components = {
  p: (props) => <Text {...props} />,
  h1: (props) => <Heading {...props} />,
  h2: (props) => <Heading {...props} level={2} />,
  h3: (props) => <Heading {...props} level={3} />,
  img: (props) => (
    <span className={classes.blogImage}>
      <Image {...props} layout="fill" alt={props.alt} objectFit="cover" />
    </span>
  ),
};

function BlogContent({ MdxSource }) {
  return (
    <div className={classes.container}>
      <MDXRemote {...MdxSource} components={components} />
    </div>
  );
}

export default BlogContent;
