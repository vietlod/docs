import React from 'react';
import styles from './styles.module.css';

function isHeadingElement(child) {
  if (!React.isValidElement(child)) return false;
  const type = child.type;
  if (typeof type === 'string') {
    return type === 'h3' || type === 'h4';
  }
  const mdxType = child.props?.mdxType || '';
  if (mdxType === 'h3' || mdxType === 'h4') return true;
  const funcName = (type?.displayName || type?.name || '').toLowerCase();
  return funcName === 'h3' || funcName === 'h4' || funcName.includes('heading');
}

export default function Steps({ children }) {
  const arr = React.Children.toArray(children).filter((child) => {
    if (typeof child === 'string') return child.trim().length > 0;
    return true;
  });

  // Check if children use heading-based steps (<h3>Step 1...</h3><p>...</p>)
  const hasDirectHeadings = arr.some((child) => isHeadingElement(child));

  if (hasDirectHeadings) {
    const groups = [];
    let currentGroup = null;

    arr.forEach((child) => {
      if (isHeadingElement(child)) {
        if (currentGroup) groups.push(currentGroup);
        currentGroup = { heading: child, body: [] };
      } else if (currentGroup) {
        currentGroup.body.push(child);
      } else {
        currentGroup = { heading: null, body: [child] };
      }
    });
    if (currentGroup) groups.push(currentGroup);

    return (
      <div className={styles.stepsContainer}>
        {groups.map((grp, idx) => (
          <div key={idx} className={`step-item ${styles.stepCard}`}>
            {grp.heading}
            <div className={styles.stepBody}>{grp.body}</div>
          </div>
        ))}
      </div>
    );
  }

  return <div className={styles.stepsContainer}>{children}</div>;
}
