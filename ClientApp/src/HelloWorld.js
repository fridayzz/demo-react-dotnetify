import React, {useMemo, useEffect, useState} from 'react';
import dotnetify, {useConnect} from 'dotnetify';
import { useTable } from "react-table";

dotnetify.hubServerUrl = 'http://192.168.31.100:5000';

function Table({ columns, data }) {
    // Use the useTable Hook to send the columns and data to build the table
    const {
      getTableProps, // table props from react-table
      getTableBodyProps, // table body props from react-table
      headerGroups, // headerGroups if your table have groupings
      rows, // rows for the table based on the data passed
      prepareRow // Prepare the row (this function need to called for each row before getting the row props)
    } = useTable({
      columns,
      data
    });
  
    /* 
      Render the UI for your table
      - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
    */
    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
  
const HelloWorld = () => {
    const {state}= useConnect('HelloWorld', { Contacts:[{}] })
    const [connState,setConnState] = useState('Nagotiating');
    useEffect(() => {
        dotnetify.connectionStateHandler = (state) => {
            setConnState(state);
        };
        return () => {
            dotnetify.connectionStateHandler = undefined;
        }
    }, [])
    console.log("HelloWorld -> state", state)
    const columns = useMemo(() => [
        {
            Header: 'Name',
            accessor: 'FullName',
          },
          {
            Header: 'City',
            accessor: 'Address.City',
          },
    ], [])
    return (
      <div>
        <strong>{connState} - {state.ServerTime}</strong>
        <Table data={state.Contacts} columns={columns}></Table>
      </div>
    )
  }

  export default HelloWorld;

