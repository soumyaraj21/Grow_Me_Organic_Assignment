// Main table component dispaying paginated artwork data

import { useState } from 'react';
import { DataTable, type DataTableStateEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useArtworkData } from '../hooks/useArtworkData';
import { useRowSelection } from '../hooks/useRowSelection';
import { CustomSelectionPanel } from './CustomSelectionPanel';
import './ArtworkTable.css';

const ROWS_PER_PAGE = 12;

export const ArtworkTable: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const { artworks, pagination, loading, error } = useArtworkData(currentPage);

    const {
        getSelectedRowsForPage,
        onSelectionChange,
        handleBulkSelection,
        clearSelection,
        totalSelectedCount,
    } = useRowSelection({
        currentPage,
        rowsPerPage: ROWS_PER_PAGE,
    });

    const selectedRows = getSelectedRowsForPage(artworks);

    const onPageChange = (event: DataTableStateEvent) => {
        if (event.page !== undefined) {
            setCurrentPage(event.page + 1);
        }
    };

    // Handles custom bulk selection from the overlay panel
    // Cap the selection count at the total number of available records
    const handleCustomSelection = (count: number) => {
        const totalRecords = pagination?.total || 0;
        const actualCount = Math.min(count, totalRecords);

        // Inform user if they tried to select more than available
        if (count > totalRecords) {
            alert(`Only ${totalRecords} rows available. Selecting all ${totalRecords} rows.`);
        }

        handleBulkSelection(actualCount);
    };

    if (error) {
        return (
            <div className="error-container">
                <i className="pi pi-exclamation-triangle" style={{ fontSize: '3rem', color: '#e74c3c' }}></i>
                <h2>Error Loading Artworks</h2>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="artwork-table-container">
            <div className="table-header">
                <div className="selection-info">
                    <span>Selected: {totalSelectedCount} rows</span>
                    {totalSelectedCount > 0 && (
                        <button onClick={clearSelection} className="clear-btn">
                            Clear Selection
                        </button>
                    )}
                </div>
                <CustomSelectionPanel onSubmit={handleCustomSelection} />
            </div>

            <DataTable
                value={artworks}
                selection={selectedRows}
                // Passing artworks array to selection handler so it can track which IDs are on current page
                onSelectionChange={(e) => onSelectionChange(e, artworks)}
                selectionMode="multiple"
                dataKey="id"
                paginator
                rows={ROWS_PER_PAGE}
                totalRecords={pagination?.total || 0}
                lazy
                first={(currentPage - 1) * ROWS_PER_PAGE}
                onPage={onPageChange}
                loading={loading}
                className="artwork-datatable"
                paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink"
                currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            >
                <Column
                    selectionMode="multiple"
                    headerStyle={{ width: '3rem' }}
                />
                <Column
                    field="title"
                    header="Title"
                    body={(rowData) => <strong>{rowData.title}</strong>}
                    style={{ minWidth: '200px' }}
                />
                <Column
                    field="place_of_origin"
                    header="Place of Origin"
                    style={{ minWidth: '150px' }}
                />
                <Column
                    field="artist_display"
                    header="Artist"
                    style={{ minWidth: '200px' }}
                />
                <Column
                    field="inscriptions"
                    header="Inscriptions"
                    body={(rowData) => rowData.inscriptions || 'N/A'}
                    style={{ minWidth: '200px' }}
                />
                <Column
                    field="date_start"
                    header="Start Date"
                    style={{ minWidth: '100px' }}
                />
                <Column
                    field="date_end"
                    header="End Date"
                    style={{ minWidth: '100px' }}
                />
            </DataTable>
        </div>
    );
};

