/* 
Custom hook to handle row selection when data is paginated.

The assignment explicitly does not allow prefetching other pages or storing complete row/artwork objects. Because of that, the selction is tracked using a simple index + ID based approach instead of keeping full data in memory.

Approach used:
- Only row IDs are stored, never the full objects
- A set is used so checking whether a row is selected is fast
- Selection state is calculated at render time for the current page
- Works for both single row selection and select-all on a page
*/

import { useState, useCallback, useMemo } from 'react';
import type { Artwork } from '../types/artwork';

interface UseRowSelectionProps {
    currentPage: number;
    rowsPerPage: number;
}

export const useRowSelection = ({ currentPage, rowsPerPage }: UseRowSelectionProps) => {
    // Stores IDs of rows that are explicitly selected by the user
    const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
    // Stores IDs of rows that are explicitly deselcted (used in bulk selection mode)
    const [deselectedIds, setDeselectedIds] = useState<Set<number>>(new Set());
    // When user does custom bulk selection, we store the count. This allows us to calculate which rows should be selected without fetching all pages
    const [bulkSelectionCount, setBulkSelectionCount] = useState<number | null>(null);

/* 
Determines which rows on the current page should appear selected.
This runs on every render for the active page.

@param artworks - Artwork data for the current page (12 items only)
@returns List of artworks that need to be marked as selected

How it works:
-First, compute a global index for each row based on the page number (currentPage - 1) * rowsPerPage + localIndex
- If bulk selection is enabled (for ex, selecting the first 100 rows):
    - Any row with a global index less than 100 is considered selected, unless the user manually deselected it
    - Rows beyond that are only selected if they were explicitly chosen
- If normal mode, only show rows whose IDs are in selectedIds set
*/

    const getSelectedRowsForPage = useCallback((artworks: Artwork[]): Artwork[] => {
        return artworks.filter((artwork, index) => {
            const globalIndex = (currentPage - 1) * rowsPerPage + index;

            if (bulkSelectionCount !== null) {
                if (globalIndex < bulkSelectionCount) {
                    return !deselectedIds.has(artwork.id);
                }
                return selectedIds.has(artwork.id);
            }

            return selectedIds.has(artwork.id);
        });
    }, [currentPage, rowsPerPage, bulkSelectionCount, selectedIds, deselectedIds]);

/* 
Handles when user clicks checkboxes to select or deselect rows
It merges new selections with existing ones

@param e - Event containing newly selected rows on current page
@param artworks - All artworks on current page (needed to get their IDs)

How it works:
- Get IDs of currently selected rows on this page
- Remove all current page IDs from out set
- Add back only the ones that are checked
- This preserves selections from other pages
*/

    const onSelectionChange = useCallback((e: { value: Artwork[] }, artworks: Artwork[]) => {
        const newSelectedRows = e.value;
        const newSelectedRowIds = new Set(newSelectedRows.map(row => row.id));

        // BULK SELECTION MODE
        if (bulkSelectionCount !== null) {
            const updatedDeselectedIds = new Set(deselectedIds);
            const updatedSelectedIds = new Set(selectedIds);

            artworks.forEach((artwork, index) => {
                // For each row, calculate if it should be selected based on its global position
                const globalIndex = (currentPage - 1) * rowsPerPage + index;
                const shouldBeSelected = globalIndex < bulkSelectionCount;
                const isSelected = newSelectedRowIds.has(artwork.id);

                // Tracking Exceptions: Rows that should be selected but user deselected them
                if (shouldBeSelected && !isSelected) {
                    updatedDeselectedIds.add(artwork.id);
                } 
                else if (shouldBeSelected && isSelected) {
                    updatedDeselectedIds.delete(artwork.id);
                }
                // Tracking Exceptions: Rows that should not be selected but user selected them
                else if (!shouldBeSelected && isSelected) {
                    updatedSelectedIds.add(artwork.id);
                } 
                else if (!shouldBeSelected && !isSelected) {
                    updatedSelectedIds.delete(artwork.id);
                }
            });

            setDeselectedIds(updatedDeselectedIds);
            setSelectedIds(updatedSelectedIds);
        } 
        else {
            const updatedSelectedIds = new Set(selectedIds);

            const currentPageIds = new Set(artworks.map(artwork => artwork.id));

            currentPageIds.forEach(id => updatedSelectedIds.delete(id));

            newSelectedRowIds.forEach(id => updatedSelectedIds.add(id));

            setSelectedIds(updatedSelectedIds);
        }
    }, [bulkSelectionCount, deselectedIds, selectedIds, currentPage, rowsPerPage]);

    const handleBulkSelection = useCallback((count: number) => {
        setBulkSelectionCount(count);
        setSelectedIds(new Set());
        setDeselectedIds(new Set());
    }, []);

    const clearSelection = useCallback(() => {
        setSelectedIds(new Set());
        setDeselectedIds(new Set());
        setBulkSelectionCount(null);
    }, []);

    const totalSelectedCount = useMemo(() => {
        if (bulkSelectionCount !== null) {
            return bulkSelectionCount - deselectedIds.size + selectedIds.size;
        }
        return selectedIds.size;
    }, [bulkSelectionCount, deselectedIds.size, selectedIds.size]);

    return {
        getSelectedRowsForPage,
        onSelectionChange,
        handleBulkSelection,
        clearSelection,
        totalSelectedCount,
        bulkSelectionCount,
    };
};
