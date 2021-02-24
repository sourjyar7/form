import React from 'react'
import axios from 'axios'
import './displayUsers.css'
import { ColFilter } from './ColFilter'
import { useTable ,useFilters,usePagination } from 'react-table'

export const DisplayUsers = () => {
    const [users ,setUsers] = React.useState([]);  
    const url ='https://test-server-mern.herokuapp.com/getUsers'
    React.useEffect(()=>{
        axios.get(url).then((resp)=>{
            const data = resp.data;
            data.map((val=>val.isHidden=false));
            setUsers(data);
        
        })},[]);
    const data = React.useMemo(
   () => users,
   [users]
 )
    const columns = React.useMemo(
   () => [
     {
       Header: 'Name',
       accessor: 'name', // accessor is the "key" in the data
       Filter: ColFilter
     },
     {
       Header: 'Age',
       accessor: 'age',
       Filter: ColFilter
     },
     {
       Header: 'Email',
       accessor: 'email',
       Filter: ColFilter
     },
     {
       Header: 'Gender',
       accessor: 'gender',
       Filter: ColFilter
     }
   ],
   [users]
 )
 const tableInstance = useTable({ columns, data },useFilters,usePagination);
 const {
   getTableProps,
   getTableBodyProps,
   headerGroups,
   page,
   state,
   nextPage,
   previousPage,
   canPreviousPage,
   canNextPage,
   setPageSize,
   prepareRow,
 } = tableInstance;
    const { pageSize } = state
    return (
        <>
        <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
       <thead>
           
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   borderBottom: 'solid 3px red',
                   background: 'aliceblue',
                   color: 'black',
                   fontWeight: 'bold',
                 }}
               >
                 {column.render('Header')}
                  <div>{column.canFilter ? column.render('Filter') : null}</div>
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {page.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px gray',
                       background: 'papayawhip',
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
     <div>
         <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button>
        <button onClick={() => nextPage()} disabled={!canNextPage} >
          Next
        </button>
       Page Size: <input type="number" onChange={(e)=>setPageSize(e.target.value)}></input>
     </div>
     </>
    )
}




