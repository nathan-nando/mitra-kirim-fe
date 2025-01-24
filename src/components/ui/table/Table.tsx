import { useState} from "react";
import "./table.css";
import { capitalizeWords } from "@/utils/capitilize";
import HorizontalLineLoading from "@/components/ui/loading/Horizontal";

type TableRow = {
    [key: string]: string | number;
};

type TableProps = {
    fields: string[];
    data: TableRow[];
    onAdd?: () => void;
    onUpdate?: (row: TableRow) => void;
    onDelete?: (row: TableRow) => void;
    onView?: (row: TableRow) => void;
    loading:boolean
};

export function TableUI({ fields, data, onAdd, onUpdate, onDelete, onView, loading}: TableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(
        null
    );

    // Filter data based on search term
    const filteredData = data.filter((row) =>
        fields.some((field) => String(row[field]).toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Sort data
    const sortedData = [...filteredData].sort((a, b) => {
        if (sortConfig !== null) {
            const { key, direction } = sortConfig;

            // Special case for sorting by "No" (index)
            if (key === "no") {
                const indexA = filteredData.indexOf(a); // Get the original index of row A
                const indexB = filteredData.indexOf(b); // Get the original index of row B
                return direction === "asc" ? indexA - indexB : indexB - indexA;
            }

            // Default sorting for other fields
            if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
            if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    // Calculate paginated data
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

    // Total number of pages
    const totalPages = Math.ceil(sortedData.length / rowsPerPage);

    // Change page
    const paginate = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    // Change rows per page
    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRowsPerPage(Number(event.target.value));
        setCurrentPage(1); // Reset to the first page
    };

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reset to the first page when searching
    };

    // Handle sort
    const handleSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig?.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    // Generate pagination buttons with a static length of 5
    const renderPaginationButtons = () => {
        const buttons = [];
        const maxButtons = 5; // Always show 5 page numbers

        // Calculate the range of pages to display
        let startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);

        // Adjust the range if near the start or end
        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        // Generate buttons for the calculated range
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
                    <button onClick={() => paginate(i)} className="page-link">
                        {i}
                    </button>
                </li>
            );
        }

        return buttons;
    };

    return (
        <div>
            {loading ? <HorizontalLineLoading /> : <></>}
            {/* Search Input and Add Button */}
            <div className="mt-4 d-flex justify-content-between mb-3 col-6">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control w-50"
                />
                {onAdd && (
                    <button onClick={onAdd} className="btn btn-foreground">
                        Add New
                    </button>
                )}
            </div>

            {/* Table */}
            <table className="table">
                <thead>
                <tr>
                    <th className="text-center" key="no">
                        <span>No</span>
                        <button
                            onClick={() => handleSort("no")}
                            className="btn btn-sm btn-sort"
                            aria-label="Sort by No"
                        >
                            {sortConfig?.key === "no" ? (
                                sortConfig.direction === "asc" ? (
                                    <span>&uarr;</span> // Up arrow for ascending
                                ) : (
                                    <span>&darr;</span> // Down arrow for descending
                                )
                            ) : (
                                <span>&uarr;&darr;</span> // Both arrows for unsorted
                            )}
                        </button>
                    </th>
                    {fields.map((field, index) => (
                        <th key={index}>
                            <div className="d-flex align-items-center ">
                                <span>{capitalizeWords(field)}</span>
                                <button
                                    onClick={() => handleSort(field)}
                                    className="btn btn-sm btn-sort"
                                    aria-label={`Sort by ${field}`}
                                >
                                    {sortConfig?.key === field ? (
                                        sortConfig.direction === "asc" ? (
                                            <span>&uarr;</span> // Up arrow for ascending
                                        ) : (
                                            <span>&darr;</span> // Down arrow for descending
                                        )
                                    ) : (
                                        <span>&uarr;&darr;</span> // Both arrows for unsorted
                                    )}
                                </button>
                            </div>
                        </th>
                    ))}
                    {(onUpdate || onDelete || onView) && (
                        <th className="text-center">Actions</th>
                    )}
                </tr>
                </thead>
                <tbody>
                {currentRows.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        <td key={rowIndex + 1} className="text-center">
                            {sortedData.indexOf(row) + 1} {/* Display the sorted index */}
                        </td>
                        {fields.map((field, colIndex) => (
                            <td key={colIndex}>{row[field]}</td>
                        ))}
                        {(onUpdate || onDelete || onView) && (
                            <td className="text-center">
                                {onView && (
                                    <button
                                        onClick={() => onView(row)}
                                        className="btn-outline-primary btn"
                                    >
                                        View
                                    </button>
                                )}
                                {onUpdate && (
                                    <button
                                        onClick={() => onUpdate(row)}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Update
                                    </button>
                                )}
                                {onDelete && (
                                    <button
                                        onClick={() => onDelete(row)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-5 pt-5 d-flex justify-content-between align-items-center">
                {/* Rows per page dropdown */}
                <div className="d-flex flex-row col-4 align-items-center">
                    <label className="col-4">
                        <small>Rows per page</small>
                    </label>
                    <select
                        value={rowsPerPage}
                        onChange={handleRowsPerPageChange}
                        className="form-select w-25"
                    >
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                    </select>
                </div>

                {/* Pagination buttons */}
                <nav>
                    <ul className="pagination">
                        {/* Previous button */}
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button onClick={() => paginate(currentPage - 1)} className="page-link">
                                Previous
                            </button>
                        </li>

                        {/* Page numbers (always 5 buttons) */}
                        {renderPaginationButtons()}

                        {/* Next button */}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button onClick={() => paginate(currentPage + 1)} className="page-link">
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}
