import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addProduit, updateProduit } from '../features/produitSlice';

function ProductForm(){
    const {id}=useParams();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const produits=useSelector((state)=>state.produitsState.produits);

    const [formData,setFormData]=useState({
        ref:'',
        intitule:'',
        prix:'',
        categorie:'',
        photo:'',
    });

    const isEdit=Boolean(id);

    useEffect(()=>{
        if(isEdit){
            const existingProduct=produits.find((p)=>p.ref===id);
            if(existingProduct){
                setFormData(existingProduct);
            }
        }
    },[id,isEdit,produits]);

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        const productPayload={
            ...formData,
            prix:Number(formData.prix)
        };

        if(isEdit){
            dispatch(updateProduit(productPayload));
        }else{
            dispatch(addProduit(productPayload));
        }
        navigate('/produits');
    };

    return (
    <div className="container mt-4">
      <h2>{isEdit ? 'Modifier le Produit' : 'Ajouter un Produit'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Référence</label>
          <input
            type="text"
            className="form-control"
            name="ref"
            value={formData.ref}
            onChange={handleChange}
            disabled={isEdit}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Intitulé</label>
          <input
            type="text"
            className="form-control"
            name="intitule"
            value={formData.intitule}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Prix (DH)</label>
          <input
            type="number"
            className="form-control"
            name="prix"
            value={formData.prix}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Catégorie</label>
          <input
            type="text"
            className="form-control"
            name="categorie"
            value={formData.categorie}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">URL Photo</label>
          <input
            type="text"
            className="form-control"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary me-2">
          {isEdit ? 'Mettre à jour' : 'Ajouter'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => navigate('/produits')}>
          Annuler
        </button>
      </form>
    </div>
  );
}

export default ProductForm;