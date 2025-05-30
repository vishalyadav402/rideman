"use client"
import React, { useEffect, useState } from "react";

const BookingsComponent = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("https://app.xride.co.in/api/bookings")
      .then((response) => setBookings(response.data))
      .catch((error) => console.error("Error fetching bookings:", error));
  }, []);

  return (
    <div className="card">
      <div className="card-content">
        <h2 className="text-xl font-semibold mb-4">Bookings</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Pickup</th>
              <th>Dropoff</th>
              <th>Fare</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.id}</td>
                <td>{booking.pickup_location}</td>
                <td>{booking.dropoff_location}</td>
                <td>₹{booking.fare_amount}</td>
                <td>{booking.booking_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingsComponent;
