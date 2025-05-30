"use client"
import { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    // Redirect to index.html on page load
    window.location.href = 'index.html';
  }, []);

  return null; // You can return null since this component only redirects
}