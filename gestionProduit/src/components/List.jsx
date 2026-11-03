import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  deleteProduit,
  setSearchTerm,
  setSelectedCategory,
} from '../features/produitSlice';
import { addToCart } from '../features/panierSlice';

function List() {
  const dispatch = useDispatch();
  const { produits, searchTerm, selectedCategory } = useSelector(
    (state) => state.produitsState
  );

  const categories = [...new Set(produits.map((p) => p.categorie))];

  const filteredProduits = produits.filter((p) => {
    const matchesSearch = p.intitule.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? p.categorie === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Liste des Produits</h2>
        <Link to="/add" className="btn btn-success">
          + Ajouter Produit
        </Link>
      </div>

      <div className="row mb-4 g-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Rechercher par intitulé..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          >
            <option value="">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th>Photo</th>
            <th>Ref</th>
            <th>Intitulé</th>
            <th>Prix</th>
            <th>Catégorie</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProduits.length > 0 ? (
            filteredProduits.map((p) => (
              <tr key={p.ref}>
                <td>
                  <img src={p.photo} alt={p.intitule} width="50" height="50" style={{ objectFit: 'cover' }} />
                </td>
                <td>{p.ref}</td>
                <td>{p.intitule}</td>
                <td>{p.prix} DH</td>
                <td>{p.categorie}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => dispatch(addToCart(p))}
                  >
                    Acheter
                  </button>
                  <Link to={`/edit/${p.ref}`} className="btn btn-warning btn-sm me-2">
                    Éditer
                  </Link>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => dispatch(deleteProduit(p.ref))}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                Aucun produit trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;