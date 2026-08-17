import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, ChevronUp, MoreHorizontal, Eye, Edit, Trash2, AlertCircle, Loader2, X } from 'lucide-react';

const DataTable = ({
  columns,
  data,
  title,
  searchable = false,
  showFilter = true,
  searchPlaceholder = "Search...",
  filterOptions = [],
  selectable = false,
  onSelectionChange,
  onView,
  onEdit,
  onDelete,
  loading = false,
  error = null,
  onRetry,
  emptyMessage = "No data available",
  rowsPerPageOptions = [5, 10, 25, 50],
  defaultRowsPerPage = 5,
  headerClassName = "",
  tableClassName = "",
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(defaultRowsPerPage);
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [rowToDelete, setRowToDelete] = useState(null);
  const [actionMenuOpen, setActionMenuOpen] = useState(null); // Store row index for open menu

  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const filterDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterDropdownRef.current && !filterDropdownRef.current.contains(event.target)) {
        setFilterDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filtering
  const filteredData = useMemo(() => {
    const safeData = data || [];
    let result = safeData;

    if (Object.keys(activeFilters).length > 0) {
      result = result.filter(row => {
        return Object.entries(activeFilters).every(([key, values]) => {
          if (!values || values.length === 0) return true;
          return values.includes(row[key]);
        });
      });
    }

    if (!searchQuery) return result;
    const lowerQuery = searchQuery.toLowerCase();
    return result.filter(row => {
      return columns.some(col => {
        if (!col.accessor) return false;
        const val = row[col.accessor];
        return val != null && String(val).toLowerCase().includes(lowerQuery);
      });
    });
  }, [data, searchQuery, columns, activeFilters]);

  // Sorting
  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  // Pagination
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(start, start + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(sortedData.length / rowsPerPage);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const newSelected = new Set(paginatedData.map((_, idx) => idx));
      setSelectedRows(newSelected);
      if (onSelectionChange) onSelectionChange(Array.from(newSelected).map(idx => paginatedData[idx]));
    } else {
      setSelectedRows(new Set());
      if (onSelectionChange) onSelectionChange([]);
    }
  };

  const handleSelectRow = (idx, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(idx);
    } else {
      newSelected.delete(idx);
    }
    setSelectedRows(newSelected);
    if (onSelectionChange) onSelectionChange(Array.from(newSelected).map(i => paginatedData[i]));
  };

  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setDeleteModalOpen(true);
    setActionMenuOpen(null);
  };

  const confirmDelete = () => {
    if (onDelete && rowToDelete) {
      onDelete(rowToDelete);
    }
    setDeleteModalOpen(false);
    setRowToDelete(null);
  };

  const handleFilterChange = (key, value) => {
    setActiveFilters(prev => {
      const current = prev[key] || [];
      const updated = current.includes(value) 
        ? current.filter(v => v !== value)
        : [...current, value];
      
      if (updated.length === 0) {
        const newState = { ...prev };
        delete newState[key];
        return newState;
      }
      return { ...prev, [key]: updated };
    });
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setCurrentPage(1);
  };

  const activeFilterCount = Object.values(activeFilters).reduce((acc, curr) => acc + curr.length, 0);

  return (
    <div className={`rounded-xl border border-stroke dark:border-[#2E3A47] bg-white dark:bg-[#24303F] shadow-sm ${headerClassName}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-5 pt-6 pb-4 sm:px-7.5">
        {title && <h4 className="text-xl font-bold text-[#1C2434] dark:text-white">{title}</h4>}
        
        {(searchable || showFilter) && (
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {searchable && (
              <div className="relative w-full sm:w-64">
                <button className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-gray-400" />
                </button>
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full rounded-md border border-stroke dark:border-[#2E3A47] bg-transparent py-2 pl-10 pr-4 text-sm outline-none focus:border-[#3C50E0] focus:ring-1 focus:ring-[#3C50E0] text-[#1C2434] dark:text-white"
                />
              </div>
            )}
            {showFilter && filterOptions.length > 0 && (
              <div className="relative" ref={filterDropdownRef}>
                <button 
                  onClick={() => setFilterDropdownOpen(!filterDropdownOpen)}
                  className={`flex items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium transition whitespace-nowrap ${
                    activeFilterCount > 0 
                      ? 'border-[#3C50E0] bg-[#3C50E0]/10 text-[#3C50E0] dark:border-[#3C50E0] dark:bg-[#3C50E0]/20' 
                      : 'border-stroke text-[#64748B] hover:bg-gray-50 dark:border-[#2E3A47] dark:text-[#8A99AF] dark:hover:bg-[#313D4A]'
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.583374 2.33333C0.583374 1.689 1.10571 1.16667 1.75004 1.16667H12.25C12.8944 1.16667 13.4167 1.689 13.4167 2.33333C13.4167 2.59392 13.2952 2.8398 13.0886 2.99478L8.75004 6.24838V11.0833C8.75004 11.5305 8.44147 11.9168 8.00662 12.0155L6.25662 12.4131C5.62688 12.5562 5.03337 12.0768 5.03337 11.4325V6.24838L0.694828 2.99478C0.48819 2.8398 0.583374 2.59392 0.583374 2.33333Z" fill="currentColor"/>
                  </svg>
                  Filter {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>
                
                {filterDropdownOpen && (
                  <div className="absolute right-0 top-full z-40 mt-2 w-64 rounded-md border border-stroke bg-white shadow-default dark:border-[#2E3A47] dark:bg-[#24303F]">
                    <div className="p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <h5 className="font-semibold text-[#1C2434] dark:text-white">Filters</h5>
                        {activeFilterCount > 0 && (
                          <button onClick={clearFilters} className="text-xs text-[#3C50E0] hover:underline">
                            Clear all
                          </button>
                        )}
                      </div>
                      
                      <div className="flex flex-col gap-4 max-h-[300px] overflow-y-auto">
                        {filterOptions.map((filter) => (
                          <div key={filter.key}>
                            <h6 className="mb-2 text-sm font-medium text-[#1C2434] dark:text-white">{filter.label}</h6>
                            <div className="flex flex-col gap-2">
                              {filter.options.map((option) => (
                                <label key={option} className="flex cursor-pointer items-center gap-2 text-sm text-[#64748B] dark:text-[#8A99AF]">
                                  <input 
                                    type="checkbox" 
                                    className="rounded border-stroke focus:ring-[#3C50E0] text-[#3C50E0] dark:border-[#2E3A47]"
                                    checked={(activeFilters[filter.key] || []).includes(option)}
                                    onChange={() => handleFilterChange(filter.key, option)}
                                  />
                                  {option}
                                </label>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Table */}
      <div className="max-w-full overflow-x-auto pb-4">
        <table className={`w-full table-auto min-w-max ${tableClassName}`}>
          <thead>
            <tr className="bg-[#F8FAFC] dark:bg-[#313D4A]/50 text-left">
              {selectable && (
                <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-y border-stroke dark:border-[#2E3A47] w-12 text-center">
                  <input 
                    type="checkbox" 
                    onChange={handleSelectAll}
                    checked={paginatedData.length > 0 && selectedRows.size === paginatedData.length}
                    className="w-4 h-4 rounded border-gray-300 text-[#3C50E0] focus:ring-[#3C50E0]" 
                  />
                </th>
              )}
              {columns.map((col, idx) => (
                <th 
                  key={idx} 
                  onClick={() => col.sortable !== false && col.accessor ? handleSort(col.accessor) : null}
                  className={`px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-y border-stroke dark:border-[#2E3A47] ${col.sortable !== false && col.accessor ? 'cursor-pointer select-none hover:text-[#1C2434] dark:hover:text-white' : ''} ${col.className || ''}`}
                >
                  <div className="flex items-center gap-1">
                    {col.header}
                    {col.sortable !== false && col.accessor && sortConfig.key === col.accessor && (
                      sortConfig.direction === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th className="px-4 py-3 text-xs font-semibold text-[#64748B] dark:text-[#8A99AF] uppercase border-y border-stroke dark:border-[#2E3A47] text-right">
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 5 }).map((_, idx) => (
                <tr key={idx} className="border-b border-stroke dark:border-[#2E3A47] animate-pulse">
                  {selectable && <td className="px-4 py-4"><div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded"></div></td>}
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className="px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div></td>
                  ))}
                  {(onView || onEdit || onDelete) && <td className="px-4 py-4"><div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-8 ml-auto"></div></td>}
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + ((onView || onEdit || onDelete) ? 1 : 0)} className="px-4 py-8 text-center">
                  <AlertCircle className="w-8 h-8 text-[#EF4444] mx-auto mb-2" />
                  <p className="text-[#64748B] dark:text-[#8A99AF] mb-4">{error}</p>
                  {onRetry && (
                    <button onClick={onRetry} className="text-sm bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90">
                      Try Again
                    </button>
                  )}
                </td>
              </tr>
            ) : paginatedData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + ((onView || onEdit || onDelete) ? 1 : 0)} className="px-4 py-8 text-center text-[#64748B] dark:text-[#8A99AF]">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              paginatedData.map((row, rIdx) => (
                <tr key={rIdx} className="border-b border-stroke dark:border-[#2E3A47] last:border-0 hover:bg-gray-50 dark:hover:bg-[#313D4A]/50 transition-colors">
                  {selectable && (
                    <td className="px-4 py-3.5 text-center">
                      <input 
                        type="checkbox" 
                        checked={selectedRows.has(rIdx)}
                        onChange={(e) => handleSelectRow(rIdx, e.target.checked)}
                        className="w-4 h-4 rounded border-gray-300 text-[#3C50E0] focus:ring-[#3C50E0]" 
                      />
                    </td>
                  )}
                  {columns.map((col, cIdx) => (
                    <td key={cIdx} className={`px-4 py-3.5 ${col.className || ''}`}>
                      {col.renderCell ? col.renderCell(row) : <p className="text-sm font-medium text-[#1C2434] dark:text-white">{row[col.accessor]}</p>}
                    </td>
                  ))}
                  {(onView || onEdit || onDelete) && (
                    <td className="px-4 py-3.5 text-right relative">
                      <div className="flex items-center justify-end gap-2">
                        {onView && (
                          <button onClick={() => onView(row)} className="text-gray-400 hover:text-[#3C50E0] transition" title="View">
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        {onEdit && (
                          <button onClick={() => onEdit(row)} className="text-gray-400 hover:text-[#10B981] transition" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                        )}
                        {onDelete && (
                          <button onClick={() => handleDeleteClick(row)} className="text-gray-400 hover:text-[#EF4444] transition" title="Delete">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && !error && sortedData.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 border-t border-stroke dark:border-[#2E3A47] gap-4">
          <div className="flex items-center text-sm text-[#64748B] dark:text-[#8A99AF]">
            <span>Showing {(currentPage - 1) * rowsPerPage + 1} to {Math.min(currentPage * rowsPerPage, sortedData.length)} of {sortedData.length} entries</span>
          </div>
          <div className="flex items-center gap-2">
            <select 
              value={rowsPerPage} 
              onChange={(e) => { setRowsPerPage(Number(e.target.value)); setCurrentPage(1); }}
              className="border border-stroke dark:border-[#2E3A47] bg-transparent text-sm rounded-md px-2 py-1 outline-none focus:border-[#3C50E0] text-[#1C2434] dark:text-white"
            >
              {rowsPerPageOptions.map(opt => <option key={opt} value={opt}>{opt} per page</option>)}
            </select>
            <div className="flex items-center gap-1 ml-4">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 text-sm font-medium rounded-md border border-stroke dark:border-[#2E3A47] text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Prev
              </button>
              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 text-sm font-medium rounded-md border border-stroke dark:border-[#2E3A47] text-[#64748B] dark:text-[#8A99AF] hover:bg-gray-50 dark:hover:bg-[#313D4A] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && (
        <>
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setDeleteModalOpen(false)}></div>
          <div className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-default dark:bg-[#24303F]">
            <h3 className="mb-2 text-xl font-bold text-black dark:text-white">Confirm Deletion</h3>
            <p className="mb-6 text-[#64748B] dark:text-[#8A99AF]">Are you sure you want to delete this item? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className="rounded-md border border-stroke dark:border-[#2E3A47] px-4 py-2 font-medium text-black dark:text-white hover:bg-gray-50 dark:hover:bg-[#313D4A]"
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                className="rounded-md bg-[#EF4444] px-4 py-2 font-medium text-white hover:bg-opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DataTable;
