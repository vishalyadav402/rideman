"use client";
import AdminLayout from '@/app/AdminLayout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField,InputAdornment, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress, Alert, Button } from '@mui/material';
import { useForm } from 'react-hook-form';
// import SearchIcon from "@mui/icons-material/Search";

const page = () => {
  const { register, watch } = useForm();
  const searchQuery = watch('search', '');
  const [vehicleTypes, setVehicleTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const fetchVehicleTypes = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('https://app.xride.co.in/api/vehicle-types');
        console.log('API Response:', response.data);
        if (Array.isArray(response.data)) {
          setVehicleTypes(response.data);
        } else if (response.data && Array.isArray(response.data.vehicle_types)) {
          setVehicleTypes(response.data.vehicle_types);
        } else {
          throw new Error('Unexpected API response format');
        }
      } catch (error) {
        console.error('Error fetching vehicle types:', error);
        setError('Failed to load vehicle types. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicleTypes();
  }, []);

  const filteredVehicleTypes = vehicleTypes.filter(vehicleType =>
    vehicleType?.type_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {
    console.log(`Edit vehicle type with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete vehicle type with ID: ${id}`);
  };

  const handleBlock = (id) => {
    console.log(`Block vehicle type with ID: ${id}`);
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Vehicle Types</h1>
        
        {/* Search Input */}
        <TextField
      {...register("search")}
      label="Search Vehicle Type"
      variant="outlined"
      size="small"
      className="mb-4 w-full max-w-screen-sm"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            search
          </InputAdornment>
        ),
      }}
    />

        {/* Error Message */}
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}

        {/* Vehicle Types Table */}
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
                  <TableCell><strong className='text-white'>Vehicle Type</strong></TableCell>
                  <TableCell><strong className='text-white'>Base Fare</strong></TableCell>
                  <TableCell><strong className='text-white'>Cost/Km</strong></TableCell>
                  <TableCell><strong className='text-white'>Cost/Min</strong></TableCell>
                  <TableCell><strong className='text-white'>Passenger Limit</strong></TableCell>
                  <TableCell><strong className='text-white'>Created At</strong></TableCell>
                  <TableCell><strong className='text-white'>Updated At</strong></TableCell>
                  <TableCell><strong className='text-white'>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredVehicleTypes.length > 0 ? (
                  filteredVehicleTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(vehicleType => (
                    <TableRow key={vehicleType.id}>
                      <TableCell className='font-semibold'>{vehicleType.id}</TableCell>
                      <TableCell>{vehicleType.type_name || '---'}</TableCell>
                      <TableCell>₹{vehicleType.base_fare || '---'}</TableCell>
                      <TableCell>₹{vehicleType.cost_per_km || '---'}</TableCell>
                      <TableCell>₹{vehicleType.cost_per_min || '---'}</TableCell>
                      <TableCell>{vehicleType.passenger_limit || '---'}</TableCell>
                      <TableCell>{vehicleType.created_at || '---'}</TableCell>
                      <TableCell>{vehicleType.updated_at || '---'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                        <button onClick={() => handleEdit(vehicleType.id)} className="px-2 py-1 bg-blue-500 text-white rounded-l-md hover:bg-blue-600">
                        Edit
                        </button>
                        <button onClick={() => handleDelete(vehicleType.id)} className="px-2 py-1 bg-red-500 text-white hover:bg-red-600">
                        Delete
                        </button>
                        <button onClick={() => handleBlock(vehicleType.id)} className="px-2 py-1 bg-yellow-500 text-white rounded-r-md hover:bg-yellow-600">
                        Block
                        </button>
                    </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No vehicle types found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredVehicleTypes.length}
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
