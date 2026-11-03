import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementQte,
  decrementQte,
  removeFromCart,
  clearCart,
} from '../features/panierSlice';
import { Link } from 'react-router-dom';

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.panierState.items);

  const totalGeneral = items.reduce((sum, item) => sum + item.produit.prix * item.qte, 0);

  if (items.length === 0) {
    return (
      <div className="container mt-5 text-center">
        <h2>Votre panier est vide</h2>
        <Link to="/produits" className="btn btn-primary mt-3">
          Retourner aux achats
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>Mon Panier</h2>
      <table className="table align-middle mt-3">
        <thead>
          <tr>
            <th>Produit</th>
            <th>Prix unitaire</th>
            <th>Quantité</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ produit, qte }) => (
            <tr key={produit.ref}>
              <td>
                <div className="d-flex align-items-center">
                  <img src={produit.photo} alt={produit.intitule} width="40" height="40" className="me-2" style={{ objectFit: 'cover' }} />
                  <span>{produit.intitule}</span>
                </div>
              </td>
              <td>{produit.prix} DH</td>
              <td>
                <button
                  className="btn btn-outline-secondary btn-sm me-2"
                  onClick={() => dispatch(decrementQte(produit.ref))}
                >
                  -
                </button>
                <span className="fw-bold">{qte}</span>
                <button
                  className="btn btn-outline-secondary btn-sm ms-2"
                  onClick={() => dispatch(incrementQte(produit.ref))}
                >
                  +
                </button>
              </td>
              <td>{produit.prix * qte} DH</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(removeFromCart(produit.ref))}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-4 p-3 bg-light rounded">
        <h4>Total Général : <span className="text-success">{totalGeneral} DH</span></h4>
        <div>
          <button className="btn btn-outline-danger me-2" onClick={() => dispatch(clearCart())}>
            Vider le panier
          </button>
          <button className="btn btn-success" onClick={() => alert('Commande validée avec succès !')}>
            Valider la commande
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;