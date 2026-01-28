// API service for fetching artwork data from Art Institue of Chicago

import type { ApiResponse } from '../types/artwork';

const API_BASE_URL = 'https://api.artic.edu/api/v1/artworks';

export const fetchArtworks = async (page: number): Promise<ApiResponse> => {
    try {
        // Construct API URL with page parameter
        const response = await fetch(`${API_BASE_URL}?page=${page}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching artworks:', error);
        throw error;
    }
};
