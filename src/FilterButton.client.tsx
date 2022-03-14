import {useTransition} from 'react';
import {useLocation} from './LocationContext.client';

const FilterButtonClient: React.FC = () => {
    const {
        location: {filterFavorites},
        setLocation,
    } = useLocation();
    const [isPending, startTransition] = useTransition();

    return (
        <button
            className="button favorite-button"
            style={{opacity: isPending ? '0.5' : '1.0'}}
            onClick={() => {
                startTransition(() =>
                    setLocation?.((loc) => ({
                        ...loc,
                        filterFavorites: !loc.filterFavorites,
                    }))
                );
            }}>
            <img
                src={filterFavorites ? 'filter-fill.svg' : 'filter-line.svg'}
                alt="toggle-filter"
            />
        </button>
    );
};

export default FilterButtonClient;
