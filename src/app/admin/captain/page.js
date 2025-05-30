"use client";

import AdminLayout from '@/app/AdminLayout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress, Alert, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

const page = () => {
  const { register, watch } = useForm();
  const searchQuery = watch('search', '');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://app.xride.co.in/api/users');
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else if (response.data && Array.isArray(response.data.users)) {
          setUsers(response.data.users);
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user =>
    user?.phone?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
  };

  const handleBlock = (id) => {
    console.log(`Block user with ID: ${id}`);
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <div className='mb-4 flex justify-between'>
        <h1 className="text-2xl font-bold">Manage Captain</h1>
        <a href='/admin/newcaptain' className='bg-green-400 py-2 px-4 rounded-md'><PersonAddAlt1Icon/> New Captain</a>
        </div>
        
        {/* Search Input */}
        <TextField
          {...register('search')}
          label="Search Users"
          variant="outlined"
          size='small'
          className="mb-4 w-full max-w-screen-sm"
        />

        {/* Error Message */}
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}

        {/* Users Table */}
        {loading ? (
          <div className="flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead className='bg-green-700'>
                <TableRow>
                  <TableCell><strong className='text-white'>ID</strong></TableCell>
                  <TableCell><strong className='text-white'>Name</strong></TableCell>
                  <TableCell><strong className='text-white'>UserType</strong></TableCell>
                  <TableCell><strong className='text-white'>Phone</strong></TableCell>
                  <TableCell><strong className='text-white'>Status</strong></TableCell>
                  <TableCell><strong className='text-white'>Created At</strong></TableCell>
                  <TableCell><strong className='text-white'>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.length > 0 ? (
                  filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(user => (
                    <TableRow key={user.id}>
                        <TableCell className='font-semibold'>{user.id}</TableCell>
                        <TableCell>{user.name?user.name:'---'}</TableCell>
                        <TableCell>{user.usertype?user.usertype:'---'}</TableCell>
                        <TableCell>{user.phone?user.phone:'---'}</TableCell>
                        <TableCell>{user.status?user.status:'---'}</TableCell>
                        <TableCell>{user.created_at?user.created_at:'---'}</TableCell>
                        <TableCell>
                        <div className="flex space-x-1">
                            <button onClick={() => handleEdit(user.id)} className="px-2 py-1 bg-blue-500 text-white rounded-l-md hover:bg-blue-600">
                            Edit
                            </button>
                            <button onClick={() => handleDelete(user.id)} className="px-2 py-1 bg-red-500 text-white hover:bg-red-600">
                            Delete
                            </button>
                            <button onClick={() => handleBlock(user.id)} className="px-2 py-1 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600">
                            Block
                            </button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No users found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredUsers.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </AdminLayout>
  );
};

export default page;
