import clsx from 'clsx';
import React from 'react';
import classes from './Heading.module.scss';

function Heading({ level = 1, children, className }) {
  if (level === 1) {
    return <h1 className={clsx(classes.heading, className)}>{children}</h1>;
  }
  if (level === 2) {
    return (
      <h2 className={clsx(classes.heading, className, classes.h2Heading)}>
        {children}
      </h2>
    );
  }
  if (level === 3) {
    return (
      <h3 className={clsx(classes.heading, className, classes.h3Heading)}>
        {children}
      </h3>
    );
  }
}

export default Heading;
