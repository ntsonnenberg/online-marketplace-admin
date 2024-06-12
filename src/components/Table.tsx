"use client";

import React, { Fragment, Key } from "react";
import { Data } from "@/lib/mongoose";

type Config<T> = {
  label: string;
  render: (data: T) => string | number | React.ReactNode | null;
  header?: () => string | number | React.ReactNode;
};

interface Props<T> {
  data: T[];
  config: Config<T>[];
  className?: string | null;
}

export default function Table<T extends Data>({
  data,
  config,
  className,
}: Props<T>) {
  const renderedHeaders = config.map((column) => {
    if (column.header) {
      return <Fragment key={column.label as Key}>{column.header()}</Fragment>;
    }

    return (
      <td key={column.label as Key} className="px-4 py-2">
        {column.label}
      </td>
    );
  });

  const renderedRows = data.map((row, rowIndex) => {
    const renderedCells = config.map((column, columnIndex) => (
      <td key={column.label as Key} className="px-4 py-2">
        {column.render(row)}
      </td>
    ));

    return <tr key={row._id as Key}>{renderedCells}</tr>;
  });

  return (
    <table className={`w-full select-none ${className}`}>
      <thead className="drop-shadow-md">
        <tr className="font-bold bg-primary text-on-primary">
          {renderedHeaders}
        </tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}
