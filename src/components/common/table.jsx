import React from "react";
import TableHeader from "./table-header";
import TableBody from "./table-body";

const Table = (props) => {
  const { columns, sortColumn, onSort, data } = props;

  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />

      <TableBody
        data={data}
        columns={columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    </table>
  );
};

export default Table;
