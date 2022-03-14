import {useLocation} from './LocationContext.client';
import {useTransition} from 'react';

const ShowStatisticsButton: React.FC = () => {
    const {setLocation} = useLocation();
    const [isPending, startTransition] = useTransition();

    return (
        <button
            className="button statistics-button"
            disabled={isPending}
            style={{opacity: isPending ? '0.5' : '1.0'}}
            onClick={() => {
                startTransition(() => {
                    setLocation &&
                        setLocation((loc) => ({
                            selectedId: null,
                            isEditing: loc.isEditing,
                            searchText: loc.searchText,
                            showStatistics: !loc.showStatistics,
                            filterFavorites: loc.filterFavorites,
                        }));
                });
            }}>
            Show Statistics
        </button>
    );
};

export default ShowStatisticsButton;
