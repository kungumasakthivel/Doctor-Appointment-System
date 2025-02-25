import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import axios from 'axios';
import { useEffect, useState } from 'react';

const columns = [
  { id: 'patientName', label: 'Patient Name', minWidth: 120 },
  { 
    id: 'date', 
    label: 'Date', 
    minWidth: 150,
    align: 'right' 
  },
  {
    id: 'appointmentType',
    label: 'Appointment Type',
    minWidth: 170,
    align: 'left',
  },
  {
    id: 'duration',
    label: 'Duration',
    minWidth: 100,
    align: 'right'
  },
  {
    id: 'notes',
    label: 'Notes',
    minWidth: 150,
    align: 'left'
  },
];

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState();
  const [len, setLen] = useState(5);

  useEffect(() => {
    axios.get('https://doctor-appointment-system-awge.onrender.com/appointment').then((response) => {
        setData(response.data);
        setLen(response.data.length);
    })
  }, []) 


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, color: '#fff' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={
                    { 
                        minWidth: column.minWidth,
                        fontWeight: 'bolder',
                        fontSize: '16px'
                    }
                  }
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody className='appointment-body'>
            {data?data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} style={{color: 'white'}}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }): null}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5]}
        component="div"
        count={len}
        rowsPerPage={rowsPerPage || 5}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ "& .MuiTablePagination-selectLabel, & .MuiTablePagination-select": { display: "none" } }}
      />
    </Paper>
  );
}
