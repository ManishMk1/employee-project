import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@/components/ui/button';
import { GoPlus } from "react-icons/go";
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../header';
import { apiClient } from '@/lib/api-client';
import { ALL_EMPLOYEE, DELETE_EMPLOYEE } from '@/utils/constants';

function EmployeeList() {
  const [rows, setRows] = useState([]); // Use state to store employee data
  const navigate=useNavigate();

  const deleteUser = async(email) => {
   const response=await apiClient.post(DELETE_EMPLOYEE,{email});
   setRows(response.data);
    // Implement deletion logic here
  };

  const editUser = (email) => {
    navigate("/edit-employee",{state:{email}})
  };

  const getData = async () => {
    try {
      const response = await apiClient.get(ALL_EMPLOYEE);
      console.log(response.data);
      setRows(response.data); // Assuming response.data contains the employee list
    } catch (error) {
      console.error("Error fetching employee data:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []); // Call getData once on component mount

  return (
    <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center gap-5'>
      <Header />
      <div>
        <NavLink to="/create-employee">
          <Button className='flex gap-2 items-center justify-center cursor-pointer z-40'>
            Create Employee <GoPlus className='text-xl' />
          </Button>
        </NavLink>
      </div>
      <div className='w-[90%] h-[60vh]'>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Unique Id</TableCell>
                <TableCell align="right">Image</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Mobile No</TableCell>
                <TableCell align="right">Designation</TableCell>
                <TableCell align="right">Gender</TableCell>
                <TableCell align="right">Course</TableCell>
                <TableCell align="right">Create Date</TableCell>
                <TableCell align="center">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id} // Use a unique identifier for the key
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row._id}
                  </TableCell>
                  <TableCell align="right">
                    <img src={row.image} alt={row.name} width="50" height="50" />
                  </TableCell>
                  <TableCell align="right">{`${row.firstName} ${row.lastName}`}</TableCell>
                  <TableCell align="right">{row.email}</TableCell>
                  <TableCell align="right">{row.mobileNo}</TableCell>
                  <TableCell align="right">{row.designation}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.course}</TableCell>
                  <TableCell align="right">{new Date(Number(row.createDate)).toLocaleDateString()}</TableCell>
                  <TableCell align="center">
                    <div className='flex gap-2 justify-center'>
                      <Button onClick={() => deleteUser(row.email)}>Delete</Button>
                      <Button onClick={() => editUser(row.email)}>Edit</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>


    </div>
  );
}

export default EmployeeList;
