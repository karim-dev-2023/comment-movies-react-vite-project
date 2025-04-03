import { createSlice } from "@reduxjs/toolkit";

// État initial du store
const initialState = [];

// Création du slice Redux pour les commentaires
const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    // Action pour ajouter un commentaire
    addComment: (state, action) => {
      state.push({
        id: Date.now(),
        note: action.payload.note,   
        texte: action.payload.texte, 
        completed: true,
      });
    },
    
    // Action pour supprimer un commentaire
    deleteComment: (state, action) => {
      return state.filter(comment => comment.id !== action.payload)
    },
  },
});

// Exportation des actions et du reducer
export const { addComment, deleteComment } = commentSlice.actions;
export default commentSlice.reducer;
