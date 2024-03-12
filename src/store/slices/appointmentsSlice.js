import { $axios, baseUrl } from "@/utils/http";
import { createSlice } from "@reduxjs/toolkit";

const appointmentsSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    loading: false,
  },
  reducers: {
    setAppointments: (state, action) => {
      state.appointments = action.payload;
    },
  },
});

export const selectAppointments = (state) => state?.appointments?.appointments;
export const { setAppointments } = appointmentsSlice.actions;

export const createAppointment = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(`${baseUrl}/booking/create`, payload);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllAppointments = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(`${baseUrl}/booking/getAllList`, payload);
    if (res) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const fetchAvailableTime = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(`${baseUrl}/booking/getBookingListForaDay`, payload);
    if (res) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// export const getCompanyById =
//   ({ id }) =>
//   async (dispatch, getState) => {
//     try {
//       const res = await $axios.get(`${baseUrl}/company/${id}`);
//       if (res) {
//         return res;
//       }
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   };

// export const updateCompany = (id, values) => async (dispatch, getState) => {
//   try {
//     const res = await $axios.put(`${baseUrl}/company/${id}`, values);
//     if (res) {
//       return res;
//     }
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// };

// export const deleteCompany =
//   ({ id }) =>
//   async (dispatch, getState) => {
//     try {
//       const res = await $axios.delete(`${baseUrl}/company/${id}`);
//       if (res) {
//         return res;
//       }
//     } catch (error) {
//       console.log(error);
//       throw error;
//     }
//   };

export default appointmentsSlice.reducer;
