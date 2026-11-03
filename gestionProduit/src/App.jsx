import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import List from './components/Produits/List';
import FormProduit from './components/Produits/FormProduit';
import Cart from './components/Cart/cart';

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/produits" replace />} />
        <Route path="/produits" element={<List />} />
        <Route path="/add" element={<FormProduit />} />
        <Route path="/edit/:id" element={<FormProduit />} />
        <Route path="/panier" element={<Cart />} />
      </Routes>
    </div>
  );
}