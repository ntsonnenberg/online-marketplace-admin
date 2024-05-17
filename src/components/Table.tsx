import React, { Fragment, Key } from "react";

type Data = {
  id: String;
};

interface Props {
  data: [Data];
  config: [
    {
      label: String;
      render: (data: Data) => string | number | React.ReactNode;
      header?: () => string | number | React.ReactNode;
    }
  ];
}

export default function Table({ data, config }: Props) {
  const renderedHeaders = config.map((column, index) => {
    if (column.header) {
      return <Fragment key={column.label as Key}>{column.header()}</Fragment>;
    }

    return <td key={column.label as Key}>{column.label}</td>;
  });

  const renderedRows = data.map((row, rowIndex) => {
    const renderedCells = config.map((column, columnIndex) => (
      <td key={column.label as Key} className="px-4 py-2">
        {column.render(row)}
      </td>
    ));

    return <tr key={row.id as Key}>{renderedCells}</tr>;
  });

  return (
    <table className="w-full select-none">
      <thead>
        <tr className="font-bold bg-primary text-on-primary border-b">
          {renderedHeaders}
        </tr>
      </thead>
      <tbody>{renderedRows}</tbody>
    </table>
  );
}
