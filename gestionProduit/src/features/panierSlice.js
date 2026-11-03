import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

const panierSlice=createSlice({
    name:'panier',
    initialState,
    reducers:{
        addToCart:(state,action)=>{
            const produit=action.payload;
            const existingItem=state.items.find(item=>item.ref===produit.ref);
            if(existingItem){
                existingItem.qte+=1;
            }else{
                state.items.push({...produit,qte:1});
            }
        },

        removeFromCart:(state,action)=>{
            const ref=action.payload;
            state.items=state.items.filter((item)=>item.produits.ref!==ref);
        },

        incrementQte:(state,action)=>{
            const ref=action.payload;
            const item=state.items.find((i)=>i.produit.ref===ref);
            if(item){
                item.qte+=1;
            }
        },

        decrementQte:(state,action)=>{
            const ref=action.payload;
            const item=state.items.find((i)=>i.produit.ref===ref);
            if(item){
                if(item.qte>1){
                    item.qte-=1;
                }else{
                    state.items=state.items.filter((i)=>i.produit.ref!==ref);
                }
            }
        },

        clearCart:(state)=>{
            state.items=[];
        },
    },
});

export const {
  addToCart,
  removeFromCart,
  incrementQte,
  decrementQte,
  clearCart,
} = panierSlice.actions;

export default panierSlice.reducer;