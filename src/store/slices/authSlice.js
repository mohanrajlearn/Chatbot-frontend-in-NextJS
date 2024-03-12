import { $axios, baseUrl } from "@/utils/http";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const payload = action.payload;
      if (payload) {
        state.loading = false;
        localStorage.setItem("user", JSON.stringify(payload));
        const { token, ...user } = payload;
        $axios.defaults.headers.Authorization = `${token}`;
        state.user = user;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("currentOrg");
      window.location = "/";
      $axios.defaults.headers.Authorization = ``;
    },
  },
});

export const selectUser = (state) => state.auth?.user;
export const selectUserLoading = (state) => state.auth?.loading;

export const { setUser, logoutUser } = authSlice.actions;

export const login = (values) => async (dispatch) => {
  try {
    let { email, password } = values;
    const res = await $axios.post(`${baseUrl}/auth/login`, { email, password });

    const { token, ...userData } = res?.data?.data;

    const user = userData;

    dispatch(setUser({ ...user, token }));
    return res;
  } catch (error) {
    throw error;
  }
};

export const signup = (values) => async (dispatch) => {
  try {
    const res = await $axios.post(`${baseUrl}/auth/signup`, values);

    return res;
  } catch (error) {
    throw error;
  }
};

export const verify_otp = (values) => async (dispatch) => {
  try {
    const res = await $axios.post(`${baseUrl}/auth/verify-otp`, values);
    console.log(res);
    const { token, ...userData } = res?.data?.data;
    console.log(token, userData);

    const user = userData;

    dispatch(setUser({ ...user, token }));
    return res;
  } catch (error) {
    throw error;
  }
};

export const resend_otp = (values) => async (dispatch) => {
  try {
    const res = await $axios.post(`${baseUrl}/auth/resend-otp`, values);
    
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const google_login = (payload) => async (dispatch) => {
  try {
    const res = await $axios.post(`${baseUrl}/auth/socialLogin`, payload);
    const { token, ...userData } = res?.data?.data;
    console.log(token, userData);

    const user = userData;

    dispatch(setUser({ ...user, token }));
    return res;
  } catch (error) {
    throw error;
  }
};

export const forgot_password = (values) => async (dispatch) => {
  try {
    const res = await $axios.post(`${baseUrl}/auth/forgot-password`, values);

    return res;
  } catch (error) {
    throw error;
  }
};

export const reset_password = (values) => async (dispatch) => {
  try {
    const res = await $axios.post(`${baseUrl}/auth/reset-password`, values);

    return res;
  } catch (error) {
    throw error;
  }
};

export const change_password = (values) => async (dispatch) => {
  try {
    const res = await $axios.put(`${baseUrl}/users/change-password`, values);

    return res;
  } catch (error) {
    throw error;
  }
};

export const updateUser = (payload, _id) => async (dispatch, getState) => {
  try {
    const res = await $axios.put(`${baseUrl}/users/update/${_id}`, payload);
    return res;
  } catch (error) {
    throw error;
    //
  }
};

export const checkSingleUser = (payload) => async (dispatch, getState) => {
  try {
    const { _id } = payload;
    const res = await $axios.get(`${baseUrl}/users/getById/${_id}`);
    return res;
  } catch (error) {
    console.log(error);
    // toast.error(error?.response?.data?.message);
  }
};

export const getAllUserWithIds = (payload) => async (dispatch, getState) => {
  try {

    const res = await $axios.post(`${baseUrl}/users/getAllListwithSpecificField`, payload);
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    // toast.error(error?.response?.data?.message);
  }
};

export const fetchAllNotifications = (payload) => async (dispatch, getState) => {
  try {

    const res = await $axios.get(`${baseUrl}/users/getAllNotifications?searchTerm=${payload.searchTerm}`);
    return res?.data;
  } catch (error) {
    console.log(error);
    // toast.error(error?.response?.data?.message);
  }
};

export const markAllNotificationRead = (payload, _id) => async (dispatch, getState) => {
  try {
    const res = await $axios.put(`${baseUrl}/users/markAllNotificationRead/${_id}`, payload);
    return res;
  } catch (error) {
    throw error;
    //
  }
};

export const markNotificationRead = (_id,nId) => async (dispatch, getState) => {
  try {
    const res = await $axios.put(`${baseUrl}/users/markSelNotificationRead/${_id}/${nId}`, payload);
    return res;
  } catch (error) {
    throw error;
    //
  }
};

export const clearAllNotifications = (payload, _id) => async (dispatch, getState) => {
  try {
    const res = await $axios.put(`${baseUrl}/users/clearAllNotifications/${_id}`, payload);
    return res;
  } catch (error) {
    throw error;
    //
  }
};

export const clearSelectedNotification = (_id,nId) => async (dispatch, getState) => {
  try {
    const res = await $axios.put(`${baseUrl}/users/clearSelNotification/${_id}/${nId}`, payload);
    return res;
  } catch (error) {
    throw error;
    //
  }
};

export const addReview = (payload) => async (dispatch, getState) => {
  try {

    const res = await $axios.post(`${baseUrl}/review/create`, payload);
    return res?.data;
  } catch (error) {
    console.log(error);
    // toast.error(error?.response?.data?.message);
  }
};

export const fetchAllReviews = (payload) => async (dispatch, getState) => {
  try {

    const res = await $axios.post(`${baseUrl}/review/getAll`, payload);
    return res?.data;
  } catch (error) {
    console.log(error);
    // toast.error(error?.response?.data?.message);
  }
};

export const updateReview = (id, payload) => async (dispatch, getState) => {
  try {

    const res = await $axios.put(`${baseUrl}/review/${id}`, payload);
    return res?.data;
  } catch (error) {
    console.log(error);
    // toast.error(error?.response?.data?.message);
  }
};

export const deleteReview = (id) => async (dispatch, getState) => {
  try {

    const res = await $axios.delete(`${baseUrl}/review/${id}`);
    return res?.data;
  } catch (error) {
    console.log(error);
    // toast.error(error?.response?.data?.message);
  }
};

export default authSlice.reducer;
