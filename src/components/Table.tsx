import { Grid } from "gridjs-react";
import { OneDArray, TColumn, TDataObject } from "gridjs/dist/src/types";
import { ComponentChild } from "preact";
import "gridjs/dist/theme/mermaid.css";

interface TableProps {
  data: TDataObject;
  columns?: OneDArray<ComponentChild | TColumn>;
}

export const Table = ({ data, columns }: TableProps) => {
  return (
    <Grid
      data={data}
      columns={columns}
      sort
      pagination={{
        limit: 10,
        enabled: true,
      }}
    />
  );
};
