"use client";

import AdminLayout from '@/app/AdminLayout';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, CircularProgress, Alert, Button } from '@mui/material';
import { useForm } from 'react-hook-form';

const page = () => {
  const { register, watch } = useForm();
  const searchQuery = watch('search', '');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("https://app.xride.co.in/api/bookings");
        console.log("API Response:", response.data); // Debugging log
  
        if (Array.isArray(response.data)) {
          setBookings(response.data);
        } else if (response.data && Array.isArray(response.data.bookings)) {
          setBookings(response.data.bookings);
        } else {
          throw new Error("Unexpected API response format");
        }
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setError("Failed to load bookings. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchBookings();
  }, []);
  
  

  const filteredBookings = bookings.filter(booking =>
    booking?.vehicle_type?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <AdminLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>
        
        {/* Search Input */}
        <TextField
          {...register('search')}
          label="Search by Vehicle Type"
          variant="outlined"
          size='small'
          className="mb-4 w-full max-w-screen-sm"
        />

        {/* Error Message */}
        {error && <Alert severity="error" className="mb-4">{error}</Alert>}

        {/* Bookings Table */}
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
                  <TableCell><strong className='text-white'>User ID</strong></TableCell>
                  <TableCell><strong className='text-white'>Driver ID</strong></TableCell>
                  <TableCell><strong className='text-white'>Vehicle Type</strong></TableCell>
                  <TableCell><strong className='text-white'>Pickup Location</strong></TableCell>
                  <TableCell><strong className='text-white'>Dropoff Location</strong></TableCell>
                  <TableCell><strong className='text-white'>Distance (KM)</strong></TableCell>
                  <TableCell><strong className='text-white'>Fare Amount</strong></TableCell>
                  <TableCell><strong className='text-white'>Payment Status</strong></TableCell>
                  <TableCell><strong className='text-white'>Booking Status</strong></TableCell>
                  <TableCell><strong className='text-white'>Ride Status</strong></TableCell>
                  <TableCell><strong className='text-white'>Payment Method</strong></TableCell>
                  <TableCell><strong className='text-white'>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings.length > 0 ? (
                  filteredBookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(booking => (
                    <TableRow key={booking.id}>
                      <TableCell className='font-semibold'>{booking.id}</TableCell>
                      <TableCell className='font-semibold'>{booking.user_id}</TableCell>
                      <TableCell className='font-semibold'>{booking.driver_id}</TableCell>
                      <TableCell>{booking.vehicle_type}</TableCell>
                      <TableCell>{booking.pickup_location}</TableCell>
                      <TableCell>{booking.dropoff_location}</TableCell>
                      <TableCell>{booking.distance_km}</TableCell>
                      <TableCell>₹{booking.fare_amount}</TableCell>
                      <TableCell>{booking.payment_status}</TableCell>
                      <TableCell>{booking.booking_status}</TableCell>
                      <TableCell>{booking.ride_status}</TableCell>
                      <TableCell>{booking.payment_method}</TableCell>
                      <TableCell>
                    <div className="flex space-x-1">
                        <button className="px-2 py-1 bg-blue-500 text-white rounded-l-md hover:bg-blue-600">
                        Edit
                        </button>
                        <button className="px-2 py-1 bg-red-500 text-white rounded-r-md hover:bg-red-600">
                        Delete
                        </button>
                    </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No bookings found</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Pagination */}
        <TablePagination
          component="div"
          count={filteredBookings.length}
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