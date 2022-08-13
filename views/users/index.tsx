import React, { useMemo, useState, useRef, useCallback,  } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import { ModuleRegistry } from '@ag-grid-community/core';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import useGetRecords from './hooks/useGetRecords';
import { CsvExportModule } from '@ag-grid-community/csv-export';



// Register the required feature modules with the Grid
ModuleRegistry.registerModules([
  CsvExportModule
]);

const styles  ={ height: 400, width: 800 }
const AttendingOtherDays = ({data}:any)=>{ 
   return (<>{data?.attendingOtherDays ? 'Yes': 'No'}</>)
}


const Records = ()=>{
    const [query, setQuery] = useState('all-attendants')
    const gridRef = useRef();
    const selectedRef=useRef<any>('all-attendants');
    const {data:apiData, fetchData} = useGetRecords(query)
    const [columnDefs] = useState([
        {field:'SN', filter:false, sortable:false},
        { field: 'userName' },
        { field: 'email' },
        { field: 'type' },
        { field: 'companyName' },
        { field: 'location' },
        { field: 'reasonForAttending' },
        { field: 'attendingOtherDays', cellRenderer:AttendingOtherDays },
        { field: 'reasonForOtherDays' },
        { field: 'telegramID' },
        { field: 'twitterHandle' },
        { field: 'gender' },
      ]);

      const handleSearch = async(e:any)=>{ 
       setQuery(e.target.value)      
    
      }

      

      const defaultColDef = useMemo(() => {
        return {
          flex: 1,
          minWidth: 100,
          sortable: true,
          resizable: true,
          filter:true,
        };
      }, []);
      
      const onBtExport = useCallback(() => {
        const file = `${selectedRef.current.value}-${new Date().toLocaleDateString("en-UK")}`
        //   @ts-ignore
        gridRef!.current!.api.exportDataAsCsv({fileName:file});
        
      }, []);
      const {data,loading, error} = apiData
      return (<div className='grid p-3 m-6 mt-12 place-content-center'>
            <div className='mb-3'>
            
      <select onChange={handleSearch} className='p-2 border rounded-md' ref={selectedRef} >
        <option value='all-attendants'>All Attendants</option>
        <option value='speaker'>Speaker</option>
        <option value='attendant'>Attendants</option>
        <option value='sponsor'>Sponsor</option>
      </select>
             
        </div>

        {!!error && <div className='p-1 mx-auto'>Error Fetch Data
        <button onClick={fetchData} className='px-3 py-2 mx-1 my-2 text-white bg-blue-800 rounded-md'>try again</button>
        </div> }
        
    <div className="relative ag-theme-alpine" style={styles}>
        
        <div className={`${loading ? "" : 'hidden'} absolute top-0 left-0 z-10 grid text-white border  place-items-center`}  style={styles}>
            <button className='p-3 px-10 bg-blue-800 rounded-sm'>Loading</button>
        </div>
        
{
  !(!!error)&&  <button
  onClick={onBtExport}
  
  className='px-3 py-2 mx-1 my-2 font-bold text-white bg-blue-800 rounded-md'
>
  Export to Excel
</button>
}
      
          

        {
            (!(!!error) ) && <AgGridReact 
            //   @ts-ignore
            ref={gridRef}
              rowData={data} 
              columnDefs={columnDefs}
              animateRows
              defaultColDef={defaultColDef}
        
              />
        }
    
    </div>
    </div>) 
}


export default Records