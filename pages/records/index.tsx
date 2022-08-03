import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import useGetRecords from './hooks/useGetRecords';

const styles  ={ height: 400, width: 800 }
const AttendingOtherDays = ({data}:any)=>{ 
   return (<>{data?.attendingOtherDays ? 'Yes': 'No'}</>)
}


const Records = ()=>{
    const [query, setQuery] = useState('')
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

      const handleSearch = (e:any)=>{
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
      
      
      const {data,loading, error} = apiData
      return (<div className='grid p-3 m-6 mt-12 place-content-center'>
            <div className='mb-3'>
      <select onChange={handleSearch} className='p-2 border rounded-md' >
        <option value=''>All Attendants</option>
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
            (!(!!error) ) && <AgGridReact 
            //   @ts-ignore
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