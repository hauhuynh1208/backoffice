import React from "react";
import { Checkbox } from "@material-ui/core";

export const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, id, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);
    // console.log(resolvedRef);
    return <Checkbox id={id} innerRef={resolvedRef} {...rest} />;
  }
);

export function renderSelectionColumn(hooks) {
  hooks.visibleColumns.push((columns) => [
    // Let's make a column for selection
    {
      id: "selection",
      width: "auto",
      // The header can use the table's getToggleAllRowsSelectedProps method
      // to render a checkbox
      Header: ({ getToggleAllPageRowsSelectedProps }) => {
        return (
          <div>
            <IndeterminateCheckbox
              id="check-box-all-datagrid"
              {...getToggleAllPageRowsSelectedProps()}
            />
          </div>
        );
      },
      // The cell can use the individual row's getToggleRowSelectedProps method
      // to the render a checkbox
      Cell: ({ row }) => {
        // console.log(row);
        return (
          <div>
            <IndeterminateCheckbox
              id={`check-box-datagrid-${row.id}`}
              {...row.getToggleRowSelectedProps()}
            />
          </div>
        );
      },
    },
    ...columns,
  ]);
}
