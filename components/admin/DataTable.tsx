type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  rows: T[];
  emptyLabel?: string;
};

export function DataTable<T extends Record<string, unknown>>({ columns, rows, emptyLabel = "No records found." }: DataTableProps<T>) {
  if (!rows.length) {
    return <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-[#F5F5F0]/70">{emptyLabel}</div>;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0B1220]/80">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.18em] text-[#F5F5F0]/60">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-4 py-3 font-medium">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-white/10 align-top">
                {columns.map((column) => {
                  const key = String(column.key);
                  const value = row[key as keyof T];

                  return (
                    <td key={`${rowIndex}-${key}`} className="px-4 py-3 text-sm text-[#F5F5F0]/90">
                      {column.render ? column.render(value as T[keyof T], row) : String(value ?? "-")}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
