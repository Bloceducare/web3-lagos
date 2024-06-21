import React, { useMemo, useState, useRef, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useVolunteers from "./hooks/useGetVolunteers";
import clean, { format } from "../../utils/cleanObject";
import CloseIcon from "../../components/Icons/Close";

const styles = { height: 400, width: 800 };

const defaultFields = [
  { field: "SN", filter: false, sortable: false },
  { field: "userName", filter: true, sortable: true },
  { field: "email", filter: true, sortable: true },
  { field: "skills", filter: true, sortable: true },
  { field: "areaOfContribution", filter: true, sortable: true },
  { field: "location", filter: true, sortable: true },
];

const VolunteersView = () => {
  const [query, setQuery] = useState("all-attendants");
  const gridRef = useRef<AgGridReact>(null);
  const selectedRef = useRef<any>("all-attendants");
  const { data: apiData, fetchData } = useVolunteers(query);
  const [columnDefs, setColumnDefs] = useState(defaultFields);
  const [modalStatus, setModalStatus] = useState({ status: false, obj: {} });

  const handleModal = (info: any) => {
    setModalStatus({
      status: true,
      obj: info.data,
    });
  };

  const close = () => {
    setModalStatus({
      status: false,
      obj: {},
    });
  };

  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 100,
      sortable: true,
      resizable: true,
      filter: true,
    };
  }, []);

  const onBtExport = useCallback(() => {
    const file = `${selectedRef.current.value}-${new Date().toLocaleDateString(
      "en-UK"
    )}`;
    gridRef.current!.api.exportDataAsCsv({ fileName: file });
  }, []);

  const { data, loading, error } = apiData;

  return (
    <div className="grid p-3 m-6 mt-12 place-content-center">
      {!!error && (
        <div className="p-1 mx-auto">
          Error Fetch Data
          <button
            onClick={fetchData}
            className="px-3 py-2 mx-1 my-2 text-white bg-blue-800 rounded-md"
          >
            Try again
          </button>
        </div>
      )}

      <div className="relative ag-theme-alpine" style={styles}>
        <div
          className={`${
            loading ? "" : "hidden"
          } absolute top-0 left-0 z-10 grid text-white border place-items-center`}
          style={styles}
        >
          <button className="p-3 px-10 bg-blue-800 rounded-sm">Loading</button>
        </div>

        {!!!error && (
          <button
            onClick={onBtExport}
            className="px-3 py-2 mx-1 my-2 font-bold text-white bg-blue-800 rounded-md"
          >
            Export to Excel
          </button>
        )}

        {!!!error && (
          <AgGridReact
            ref={gridRef}
            rowData={data}
            columnDefs={columnDefs}
            animateRows
            defaultColDef={defaultColDef}
            onCellClicked={handleModal}
          />
        )}
      </div>

      <UserModal
        status={modalStatus.status}
        obj={modalStatus.obj}
        handleClose={close}
      />
    </div>
  );
};

const UserModal = ({ obj = {}, status = false, handleClose = () => {} }) => {
  const info = clean(obj);
  const data = Object.entries(info);
  return (
    <>
      <div
        className={`${status ? " " : "hidden"} relative z-10`}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75 " />
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:max-w-lg sm:w-full">
              <div
                className="px-4 pt-5 pb-4 overflow-auto bg-white sm:p-6 sm:pb-4"
                style={{ maxHeight: "85vh" }}
              >
                <button className="absolute right-10 top-4" onClick={handleClose}>
                  <CloseIcon className="text-sm" />
                </button>
                <div className="mt-6">
                  {data.map((i, idx) => (
                    <div key={idx} className="my-3 sm:mt-0">
                      <h3 className="font-medium leading-6 text-gray-900 text-md" id="modal-title">
                        {format(i[0])}
                      </h3>
                      <div className="mt-">
                        {/* @ts-ignore */}
                        <p className="text-sm text-gray-500">{i[1]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VolunteersView;
