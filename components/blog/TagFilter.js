import clsx from 'clsx';
import React from 'react';
import classes from './TagFilter.module.scss';

function TagFilter({ tags, selectedTag, setSelectedTag, className }) {
  return (
    <div className={clsx(classes.container, className)}>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={clsx(
            classes.tagButton,
            selectedTag === tag && classes.selected
          )}
          onClick={() => setSelectedTag(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default TagFilter;
