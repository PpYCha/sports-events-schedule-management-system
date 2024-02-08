import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import { Card, IconButton, Input, Typography } from "@material-tailwind/react";
import { flexRender } from "@tanstack/react-table";
import React from "react";

const Table = ({ table, data, globalFilter, setGlobalFilter }) => {
  // console.log(globalFilter);
  return (
    <Card className="p-5">
      {/* <div className="relative flex w-full max-w-[24rem]">
        <Input
          type="text"
          label="Search"
          value={globalFilter.value}
          className="pr-20"
          containerProps={{
            className: "min-w-0",
          }}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />

        <IconButton className="!absolute right-1 top-1 h-8 rounded">
          <MagnifyingGlassIcon className="h-5 w-5" />
        </IconButton>
      </div> */}

      <table className="mt-5 w-full min-w-max table-auto text-left">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => {
            // console.log(headerGroup);
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // console.log("header", header);
                  return (
                    <th
                      key={header.id}
                      className="border-b border-blue-gray-100 bg-blue-gray-50 p-2"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {data.length === 0 ? null : (
            <>
              {table.getRowModel().rows.map((row, index) => {
                const isLast = index === data.length - 1;
                const classes = isLast
                  ? "px-2"
                  : "px-2 border-b border-blue-gray-50";
                // console.log(row);
                return (
                  <tr key={row.id} className="">
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td key={cell.id} className={classes}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </>
          )}
        </tbody>
      </table>

      {data.length === 0 ? (
        <div className="m-10 w-full text-center text-lg">
          <Typography variant="h2">No data</Typography>
        </div>
      ) : null}

      <div className="flex items-center justify-center gap-2 p-5">
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronDoubleLeftIcon width={24} />
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon width={24} />
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon width={24} />
        </button>
        <button
          className="rounded border p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronDoubleRightIcon width={24} />
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </Card>
  );
};

export default Table;
