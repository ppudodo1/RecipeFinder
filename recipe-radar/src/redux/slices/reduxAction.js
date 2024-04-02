import { createSlice } from '@reduxjs/toolkit';

const recipeSlice = createSlice({
  name: 'recipe',
  initialState: {
    name: '',
    desc: '',
    ing: []
  },
  reducers: {
    setRecipeData: (state, action) => {
      const { name, desc,steps,image,ing } = action.payload;
      
      state.name = name;
      state.desc = desc;
      state.steps = steps;
      state.image = image;
      state.ing = ing;
    }
  }
});

export const { setRecipeData } = recipeSlice.actions;
export const recipeReducer = recipeSlice.reducer;
