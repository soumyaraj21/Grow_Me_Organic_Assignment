/* 
Custom hook for fetching artwork data from API

When user navigates to a different page, we fetch fresh data from API. We do not cache previous pages (Requirement)
*/

import { useState, useEffect } from 'react';
import type { Artwork, Pagination } from '../types/artwork';
import { fetchArtworks } from '../services/artworkService';

export const useArtworkData = (currentPage: number) => {
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadArtworks = async () => {
            setLoading(true);
            setError(null);

            try {
                // Fetch only the requested page
                const response = await fetchArtworks(currentPage);
                // Replace all artworks array with new data (no caching)
                setArtworks(response.data);
                setPagination(response.pagination);
            } 
            catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch artworks');
            } 
            finally {
                setLoading(false);
            }
        };

        loadArtworks();
    }, [currentPage]); // Re-run whenever page changes

    return { artworks, pagination, loading, error };
};
