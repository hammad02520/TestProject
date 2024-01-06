import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {
    formData: {},
  },
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
  },
});

export const { setFormData } = formSlice.actions;
export const selectFormData = (state) => state.form.formData;
export default formSlice.reducer;
