import {JSX, useState} from "react";
import "./table.css";
import { capitalizeWords } from "@/utils/capitilize";
import HorizontalLineLoading from "@/components/ui/loading/Horizontal";

type TableRow = {
    [key: string]: string | number | null | undefined;
};

type SortConfig = {
    key: string;
    direction: "asc" | "desc";
} | null;

type TableProps = {
    fields: string[];
    data: TableRow[] | null | undefined;
    onAdd?: (() => void) | null;
    onUpdate?: ((row: TableRow) => void) | null;
    onDelete?: ((row: TableRow) => void) | null;
    onView?: ((row: TableRow) => void) | null;
    loading: boolean;
};

export function TableUI({
                            fields,
                            data = [],
                            onAdd = null,
                            onUpdate = null,
                            onDelete = null,
                            onView = null,
                            loading = false
                        }: TableProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState<SortConfig>(null);

    // Safely handle null/undefined data
    const safeData = data ?? [];

    // Filter data based on search term
    const filteredData = safeData.filter((row) =>
        fields.some((field) => {
            const value = row[field];
            return value != null ?
                String(value).toLowerCase().includes(searchTerm.toLowerCase()) :
                false;
        })
    );

    // Sort data with null safety
    const sortedData = [...filteredData].sort((a, b) => {
        if (sortConfig !== null) {
            const { key, direction } = sortConfig;

            // Special case for sorting by "No" (index)
            if (key === "no") {
                const indexA = filteredData.indexOf(a);
                const indexB = filteredData.indexOf(b);
                return direction === "asc" ? indexA - indexB : indexB - indexA;
            }

            const valueA = a[key];
            const valueB = b[key];

            // Handle null/undefined values in sorting
            if (valueA == null && valueB == null) return 0;
            if (valueA == null) return direction === "asc" ? -1 : 1;
            if (valueB == null) return direction === "asc" ? 1 : -1;

            // Safe comparison of non-null values
            if (valueA < valueB) return direction === "asc" ? -1 : 1;
            if (valueA > valueB) return direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    // Calculate paginated data
    const indexOfLastRow = currentPage * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);

    // Total number of pages
    const totalPages = Math.max(1, Math.ceil(sortedData.length / rowsPerPage));

    // Change page with bounds checking
    const paginate = (pageNumber: number) => {
        if (pageNumber < 1 || pageNumber > totalPages) return;
        setCurrentPage(pageNumber);
    };

    // Handle rows per page change
    const handleRowsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newRowsPerPage = Number(event.target.value);
        if (!isNaN(newRowsPerPage) && newRowsPerPage > 0) {
            setRowsPerPage(newRowsPerPage);
            setCurrentPage(1);
        }
    };

    // Handle search input change
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value ?? "");
        setCurrentPage(1);
    };

    // Handle sort
    const handleSort = (key: string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig?.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    // Generate pagination buttons with null safety
    const renderPaginationButtons = () => {
        const buttons: JSX.Element[] = [];
        const maxButtons = 5;

        let startPage = Math.max(1, currentPage - 2);
        const endPage = Math.min(totalPages, startPage + maxButtons - 1);

        if (endPage - startPage + 1 < maxButtons) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <li key={i} className={`page-item ${currentPage === i ? "active" : ""}`}>
                    <button
                        onClick={() => paginate(i)}
                        className="page-link"
                        type="button"
                    >
                        {i}
                    </button>
                </li>
            );
        }

        return buttons;
    };

    // Safe rendering of cell content
    const renderCellContent = (value: string | number | null | undefined): string => {
        if (value == null) return "";
        return String(value);
    };

    return (
        <>
            {loading && <HorizontalLineLoading />}

            {/* Search Input and Add Button */}
            <div className="mt-4 d-flex justify-content-between mb-3 col-12">
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="form-control w-25"
                />
                {onAdd && (
                    <button
                        onClick={onAdd}
                        className="btn btn-foreground"
                        type="button"
                    >
                        Add Data
                    </button>
                )}
            </div>

            {/* Table */}
            <table className="table">
                <thead>
                <tr>
                    <th className="text-center col-1">
                        <span>No</span>
                        <button
                            onClick={() => handleSort("no")}
                            className="btn btn-sm btn-sort"
                            aria-label="Sort by No"
                            type="button"
                        >
                            {sortConfig?.key === "no" ? (
                                sortConfig.direction === "asc" ? (
                                    <span>&uarr;</span>
                                ) : (
                                    <span>&darr;</span>
                                )
                            ) : (
                                <span>&uarr;&darr;</span>
                            )}
                        </button>
                    </th>
                    {fields.map((field, index) => (
                        <th key={field + index}>
                            <div className="d-flex align-items-center justify-content-center">
                                <span>{capitalizeWords(field)}</span>
                                <button
                                    onClick={() => handleSort(field)}
                                    className="btn btn-sm btn-sort"
                                    aria-label={`Sort by ${field}`}
                                    type="button"
                                >
                                    {sortConfig?.key === field ? (
                                        sortConfig.direction === "asc" ? (
                                            <span>&uarr;</span>
                                        ) : (
                                            <span>&darr;</span>
                                        )
                                    ) : (
                                        <span>&uarr;&darr;</span>
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
                        <td className="text-center">
                            {sortedData.indexOf(row) + 1}
                        </td>
                        {fields.map((field, colIndex) => (
                            <td key={field + colIndex}>
                                {renderCellContent(row[field])}
                            </td>
                        ))}
                        {(onUpdate || onDelete || onView) && (
                            <td className="text-center">
                                <div className="d-flex flex-row gap-3 justify-content-center">
                                    {onView && (
                                        <button
                                            onClick={() => onView(row)}
                                            className="btn btn-outline-primary"
                                            type="button"
                                        >
                                            <span className="bi bi-search" />
                                        </button>
                                    )}
                                    {onUpdate && (
                                        <button
                                            onClick={() => onUpdate(row)}
                                            className="btn btn-outline-warning"
                                            type="button"
                                        >
                                            <span className="bi bi-pen" />
                                        </button>
                                    )}
                                    {onDelete && (
                                        <button
                                            onClick={() => onDelete(row)}
                                            className="btn btn-outline-danger"
                                            type="button"
                                        >
                                            <span className="bi bi-trash" />
                                        </button>
                                    )}
                                </div>
                            </td>
                        )}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-5 pt-5 d-flex justify-content-between align-items-center">
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

                <nav>
                    <ul className="pagination">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                            <button
                                onClick={() => paginate(currentPage - 1)}
                                className="page-link"
                                type="button"
                            >
                                Previous
                            </button>
                        </li>
                        {renderPaginationButtons()}
                        <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                            <button
                                onClick={() => paginate(currentPage + 1)}
                                className="page-link"
                                type="button"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
}
