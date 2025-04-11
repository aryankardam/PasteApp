import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
  pastes: localStorage.getItem("pastes")
  ? JSON.parse(localStorage.getItem("pastes"))
  :[]
};

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      const paste = action.payload;
      state.pastes.push(paste);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast.success("Paste created successfully");
    },
    updateToPastes: (state, action) => {
      const paste = action.payload;
      const index = state.pastes.findIndex((item) => item._id === paste._id);

      if (index >= 0) {
        state.pastes[index] = paste;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste Updated");
      }
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast.success("All Pastes Reset");
    },
    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((item) => item._id === pasteId);

      if (index >= 0) {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast.success("Paste deleted");
      }
    },
    shareFromPastes: (state, action) => {
      const pasteId = action.payload;
      const paste = state.pastes.find((item) => item._id === pasteId);

      if (paste && navigator.share) {
        navigator.share({
          title: 'Shared Paste',
          text: `Check this out: ${paste.content}`,
          url: window.location.href
        }).then(() => {
          toast.success('Paste shared successfully!');
        }).catch((error) => {
          console.error('Error sharing paste:', error);
          toast.error('Failed to share paste');
        });
      } else {
        toast.error('Sharing is not supported on this device.');
      }
    }
  },
});

export const { addToPastes, updateToPastes, resetAllPastes, removeFromPastes, shareFromPastes } = pasteSlice.actions;

export default pasteSlice.reducer;
