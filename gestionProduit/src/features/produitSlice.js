import {createSlice} from '@reduxjs/toolkit';

const initialState={
    produits:[
        { ref: 'P101', intitule: 'PC Portable Dell', prix: 8500, categorie: 'Informatique', photo: 'https://via.placeholder.com/150' },
        { ref: 'P102', intitule: 'Clavier Mécanique', prix: 450, categorie: 'Accessoires', photo: 'https://via.placeholder.com/150' },
        { ref: 'P103', intitule: 'Écran 27 pouces', prix: 2300, categorie: 'Informatique', photo: 'https://via.placeholder.com/150' },
    ],
    searchTerm:'',
    selectedCategory:'',
};

const produitSlice=createSlice({
    name:'produit',
    initialState,
    reducers:{
        addProduit:(state,action)=>{
            state.produits.push(action.payload);
        },

        updateProduit:(state,action)=>{
            const index=state.produits.findIndex((p)=>p.ref===action.payload.ref);
            if(index!==-1){
                state.produits[index]=action.payload;
            }
        },

        deleteProduit:(state,action)=>{
            state.produits=state.produits.filter((p)=>p.ref!==action.payload);
        },

        setSearchTerm:(state,action)=>{
            state.searchTerm=action.payload;
        },

        setSelectedCategory:(state,action)=>{
            state.selectedCategory=action.payload;
        },
    },
});

export const {
    addProduit,
    updateProduit,
    deleteProduit,
    setSearchTerm,
    setSelectedCategory,
}=produitSlice.actions;

export default produitSlice.reducer;
