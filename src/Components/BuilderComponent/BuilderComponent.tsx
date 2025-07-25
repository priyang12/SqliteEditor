import React from "react";
import ConditionFilter from "./ConditionFilter";
import { useGetDBContext } from "../../Context/DBContext";
import { getDataFromQuery } from "../../Utils/queriesUtils";

// Current ability to build query.
// column selection, select table, where Condition.
// ex: SELECT col1, col2 FROM table_name WHERE search_condition;

type BuilderComponentType = {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
};
const BuilderComponent: React.FC<BuilderComponentType> = ({
  query,
  setQuery,
}) => {
  const {
    tableName,
    selectedCols: populatedSelectedCols,
    whereConditions: _,
  } = getDataFromQuery(query);
  const { workerRef } = useGetDBContext();
  const [tables, setTables] = React.useState<string[]>([]);
  const [selectedTable, setSelectedTable] = React.useState<string | undefined>(
    tableName,
  );
  const [columns, setColumns] = React.useState<string[]>([]);
  const [selectedCols, setSelectedCols] = React.useState<string[]>(
    populatedSelectedCols,
  );

  React.useEffect(() => {
    (async () => {
      if (workerRef?.current) {
        try {
          const result = await workerRef.current.getAllTables();
          if (result) {
            setTables(result);
          }
        } catch (err) {
          console.error("Failed to load tables", err);
        }
      }
    })();
  }, [workerRef?.current]);

  React.useEffect(() => {
    if (!selectedTable) return;
    (async () => {
      try {
        if (workerRef?.current) {
          const result = await workerRef.current.getTableColumns(selectedTable);
          const columnNames =
            result?.[0]?.values.map((row) => row[1] as string) || [];
          setColumns(columnNames);
        }
      } catch (err) {
        console.error(`Failed to get columns for ${selectedTable}`, err);
      }
    })();
  }, [selectedTable]);

  const tableOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const cols = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setSelectedCols(cols);

    // Update query immediately as part of the event
    if (!selectedTable) return; // guard clause

    const query =
      cols.length === 0
        ? `SELECT * FROM ${selectedTable};`
        : `SELECT ${cols.join(", ")} FROM ${selectedTable};`;

    setQuery(query);
  };

  const insertWhereConditions = (conditions: string[]) => {
    if (conditions && conditions.length > 0) {
      setQuery((prevQuery) => {
        const semicolonIndex = prevQuery.lastIndexOf(";");
        const baseQuery =
          semicolonIndex !== -1
            ? prevQuery.slice(0, semicolonIndex)
            : prevQuery;

        // Remove existing WHERE clause if present
        const whereRegex =
          /\s+WHERE\s+[\s\S]*?(?=(GROUP\s+BY|ORDER\s+BY|LIMIT|$))/i;
        const queryWithoutWhere = baseQuery.replace(whereRegex, "");

        // Append new WHERE clause
        const newWhereClause = ` WHERE ${conditions.join(" AND ")}`;
        return `${queryWithoutWhere}${newWhereClause}`;
      });
    } else {
      // remove where form query.
    }
  };

  return (
    <div>
      <div className="mb-4 flex  resize-none flex-col gap-5 rounded border border-gray-300 p-3 font-mono focus:outline-none focus:ring-2 focus:ring-blue-500">
        <div>
          <span>SELECT </span>
          <select
            multiple={!!selectedTable}
            size={Math.min(columns.length, 6)}
            disabled={!columns.length}
            value={selectedCols}
            onChange={tableOnChange}
            className="select select-bordered my-2 h-auto min-h-[8rem] w-full p-2 text-sm focus:outline-none focus:ring focus:ring-primary/50 disabled:opacity-50"
          >
            {columns.map((col, index) => (
              <option key={col + index} value={col} className="text-sm">
                {col}
              </option>
            ))}
          </select>
          <span> FROM </span>
          <span>{`(`}</span>
          <select
            name="table"
            id="table"
            className="min-h-auto select select-bordered h-auto"
            onChange={(e) => {
              setSelectedTable(e.target.value);
              setColumns([]);
              setSelectedCols([]);
            }}
            value={selectedTable}
          >
            <option value="">-- Select Table --</option>
            {tables.map((name, index) => (
              <option value={name} key={index}>
                {name?.toString()}
              </option>
            ))}
          </select>
          <span>{`)`}</span>
        </div>
        <ConditionFilter
          insertWhereConditions={insertWhereConditions}
          columns={columns}
        />
      </div>
    </div>
  );
};
export default BuilderComponent;
