import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Navbar() {
  const panierItems = useSelector((state) => state.panierState.items);
  const totalArticles = panierItems.reduce((sum, item) => sum + item.qte, 0);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/produits">
          GestionProduit
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/produits">
                Produits
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add">
                Ajouter Produit
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link btn btn-outline-light text-dark bg-light px-3" to="/panier">
                🛒 Panier <span className="badge bg-danger">{totalArticles}</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}