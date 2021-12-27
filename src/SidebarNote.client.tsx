/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {useState, useRef, useEffect, useTransition, ReactElement} from 'react';

import {useLocation} from './LocationContext.client';

interface SidebarNoteProps {
  id: number;
  title: string;
  expandedChildren: ReactElement;
}

const SidebarNote: React.FC<SidebarNoteProps> = ({
  id,
  title,
  children,
  expandedChildren,
}) => {
  const {location, setLocation} = useLocation();
  const [isPending, startTransition] = useTransition();
  const [isExpanded, setIsExpanded] = useState(false);
  const isActive = id === location.selectedId;

  // Animate after title is edited.
  const itemRef = useRef<HTMLDivElement>(null);
  const prevTitleRef = useRef(title);
  useEffect(() => {
    if (title !== prevTitleRef.current) {
      prevTitleRef.current = title;
      itemRef.current && itemRef.current.classList.add('flash');
    }
  }, [title]);

  return (
    <div
      ref={itemRef}
      onAnimationEnd={() => {
        itemRef.current && itemRef.current.classList.remove('flash');
      }}
      className={[
        'sidebar-note-list-item',
        isExpanded ? 'note-expanded' : '',
      ].join(' ')}>
      {children}
      <button
        className="sidebar-note-open"
        style={{
          backgroundColor: isPending
            ? 'var(--gray-80)'
            : isActive
            ? 'var(--tertiary-blue)'
            : '',
          border: isActive
            ? '1px solid var(--primary-border)'
            : '1px solid transparent',
        }}
        onClick={() => {
          startTransition(() => {
            setLocation &&
              setLocation((loc) => ({
                selectedId: id,
                isEditing: false,
                searchText: loc.searchText,
              }));
          });
        }}>
        Open note for preview
      </button>
      <button
        className="sidebar-note-toggle-expand"
        onClick={(e) => {
          e.stopPropagation();
          setIsExpanded(!isExpanded);
        }}>
        {isExpanded ? (
          <img
            src="chevron-down.svg"
            width="10px"
            height="10px"
            alt="Collapse"
          />
        ) : (
          <img src="chevron-up.svg" width="10px" height="10px" alt="Expand" />
        )}
      </button>
      <button className="sidebar-note-toggle-favorite">
        <img src="star-line.svg" width="20px" height="20px" alt="Expand" />
      </button>
      {isExpanded && expandedChildren}
    </div>
  );
};

export default SidebarNote;
