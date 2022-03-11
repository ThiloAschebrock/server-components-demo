/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import {Suspense} from 'react';

import Note from './Note.server';
import NoteList from './NoteList.server';
import EditButton from './EditButton.client';
import SearchField from './SearchField.client';
import NoteSkeleton from './NoteSkeleton';
import NoteListSkeleton from './NoteListSkeleton';
import {ILocation} from './types';
import ShowStatisticsButton from './ShowStatisticsButton.client';
import Statistics from './Statistics.server';
import FilterButtonClient from './FilterButton.client';

interface AppProps {
    location: ILocation;
}

const App: React.FC<AppProps> = ({location}) => {
    const {
        selectedId,
        isEditing,
        searchText,
        showStatistics,
        filterFavorites,
    } = location;
    return (
        <div className="main">
            <section className="col sidebar">
                <section className="sidebar-header">
                    <img
                        className="logo"
                        src="logo.svg"
                        width="22px"
                        height="20px"
                        alt=""
                        role="presentation"
                    />
                    <strong>React Notes</strong>
                </section>
                <section className="sidebar-menu" role="menubar">
                    <SearchField />
                    <FilterButtonClient />
                    <EditButton noteId={null}>New</EditButton>
                </section>
                <nav>
                    <Suspense fallback={<NoteListSkeleton />}>
                        <NoteList
                            searchText={searchText}
                            filterFavorites={filterFavorites}
                        />
                    </Suspense>
                </nav>
                <ShowStatisticsButton />
            </section>
            <section key={selectedId} className="col note-viewer">
                {showStatistics ? (
                    <Suspense fallback={<NoteSkeleton isEditing={false} />}>
                        <Statistics />
                    </Suspense>
                ) : (
                    <Suspense fallback={<NoteSkeleton isEditing={isEditing} />}>
                        <Note selectedId={selectedId} isEditing={isEditing} />
                    </Suspense>
                )}
            </section>
        </div>
    );
};

export default App;
