import React from 'react';

export interface Column<T> {
  id?: string;
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  cellClassName?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyExtractor: (row: T) => string | number;
  isLoading?: boolean;
  error?: string | null;
  emptyMessage?: string;
}


function DataTable<T>({
  columns,
  data,
  keyExtractor,
  isLoading = false,
  error = null,
  emptyMessage = 'Aucune donnée à afficher.',
}: DataTableProps<T>) {

  // Affiche la valeur de chaque cellule en fonction de la colonne
  const renderCell = (row: T, column: Column<T>): React.ReactNode => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row);
    }

    const value = row[column.accessor];
    return value == null ? '' : String(value);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-500">
        <svg
          className="mr-3 h-6 w-6 animate-spin text-indigo-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
        <span className="font-semibold">Erreur :</span> {error}
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="py-16 text-center text-sm text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={column.id ?? `${column.header}-${index}`}
                className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100 bg-white">
          {data.map((row) => {
            const rowKey = keyExtractor(row);

            return (
              <tr
                key={rowKey}
                className="transition-colors duration-100 hover:bg-slate-50"
              >
                {columns.map((column, index) => (
                  <td
                    key={`${rowKey}-${column.id ?? column.header}-${index}`}
                    className={`whitespace-nowrap px-4 py-3 text-slate-700 ${column.cellClassName ?? ''}`}
                  >
                    {renderCell(row, column)}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;