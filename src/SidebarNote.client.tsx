/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, {
    ReactElement,
    useEffect,
    useRef,
    useState,
    useTransition,
} from 'react';

import {useLocation} from './LocationContext.client';

interface SidebarNoteProps {
    id: number;
    title: string;
    favorite: boolean;
    expandedChildren: ReactElement;
}

const SidebarNote: React.FC<SidebarNoteProps> = ({
    id,
    title,
    favorite,
    children,
    expandedChildren,
}) => {
    const isNavigating = false;
    const isSaving = false;

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

    // 🖌 TODO: Okay, this is the onClick handler of the favorite-toggle-button, which we need to implement
    // This means, we have to store information from the client back on the server now. Another place where we have
    // similar functionality can be found in the NoteEditor.client.tsx who also manipulates the note on the server.
    // ℹ️ Interesting hooks are useNavigation and useMutation.
    // ℹ️ You do not need to change the endpoint in api.server.ts, this is already implemented.
    // 🖌 TODO: After implementing the function, toggling the favorite icon should work. Next, we want to implement the filter functionality
    // But first, let's jump into LocationContext.client.ts
    function toggleFavorite() {}

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
                                showStatistics: false,
                                filterFavorites: false,
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
                    <img
                        src="chevron-up.svg"
                        width="10px"
                        height="10px"
                        alt="Expand"
                    />
                )}
            </button>
            <button
                className="sidebar-note-toggle-favorite"
                onClick={toggleFavorite}
                disabled={isNavigating || isSaving}
                style={{
                    opacity: isNavigating || isSaving ? '0.5' : '1.0',
                }}>
                <img
                    src={favorite ? 'star-fill.svg' : 'star-line.svg'}
                    width="20px"
                    height="20px"
                    alt="Expand"
                />
            </button>
            {isExpanded && expandedChildren}
        </div>
    );
};

export default SidebarNote;
