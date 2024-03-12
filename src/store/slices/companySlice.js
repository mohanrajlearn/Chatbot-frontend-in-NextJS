import { $axios, baseUrl } from "@/utils/http";
import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: {
    company: null,
    loading: false,
  },
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },
    chatSuccess: (state, action) => {
      // Handle success if needed
    },
    chatFailure: (state, action) => {
      // Handle failure if needed
    },
    reverseGeocodeSuccess: (state, action) => {
      // Handle success if needed
    },
    reverseGeocodeFailure: (state, action) => {
      // Handle failure if needed
    },
  },
});

export const { reverseGeocodeSuccess, reverseGeocodeFailure } = companySlice.actions;

export const reverseGeocode = (latitude, longitude) => async (dispatch) => {
  const apiKey = 'bdc_aedc5e6487e14c80b9e66c1c9ca811c5';
  const reverseGeocodeUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en&key=${apiKey}`;

  try {
    console.log('Reverse geocode request:', reverseGeocodeUrl);

    const res = await $axios.get(reverseGeocodeUrl);
    console.log('Reverse geocode response:', res.data);

    const city = res.data.city;
    console.log('City:', city);

    dispatch(reverseGeocodeSuccess(city));

    return city;
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    dispatch(reverseGeocodeFailure(error));
    return null;
  }
};


export const { chatSuccess, chatFailure } = companySlice.actions;

export const chat = (payload, headers) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(`${baseUrl}/chat`, payload, { headers });
    dispatch(chatSuccess(res.data));
    return res;
  } catch (error) {
    console.error(error);
    dispatch(chatFailure(error));
    throw error;
  }
};

export const createCompany = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(`${baseUrl}/company/create`, payload);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllCompany = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(`${baseUrl}/company/getAll`, payload);
    if (res) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllCompanyWithIds = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(`${baseUrl}/company/getAllListwithSpecificField`, payload);
    if (res) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const verifyABN = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(
      `${baseUrl}/company/verifyAbnNumber`,
      payload
    );
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
    // throw error;
  }
};

export const getCompanyById =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      const res = await $axios.get(`${baseUrl}/company/${id}`);
      if (res) {
        return res;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const updateCompany = (id, values) => async (dispatch, getState) => {
  try {
    const res = await $axios.put(`${baseUrl}/company/${id}`, values);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteCompany =
  ({ id }) =>
  async (dispatch, getState) => {
    try {
      const res = await $axios.delete(`${baseUrl}/company/${id}`);
      if (res) {
        return res;
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

export const getAllcategory = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(`${baseUrl}/category/getAll`, payload);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllservices = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(`${baseUrl}/company/getCompanies`, payload);
    if (res) {
     return res.data.data
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllCategoryWithIds = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(`${baseUrl}/category/getAllListwithSpecificField`, payload);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getCategoryById = (id) => async (dispatch, getState) => {
  try {
    const res = await $axios.get(`${baseUrl}/category/${id}`);
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllProfessionals = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(
      `${baseUrl}/company/getLaborerListForTradie`,
      payload
    );
    if (res) {
      return res.data.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTradieLicenseInfo = (id) => async (dispatch, getState) => {
  try {
    const res = await $axios.get(`${baseUrl}/users/licenseInformation/${id}`);
    if (res) {
      return res.data;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllSubcategory = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(`${baseUrl}/subCategory/getAll`, payload);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getAllSubCategoryWithIds = (payload) => async (dispatch, getState) => {
  try {
    const res = await $axios.post(`${baseUrl}/subCategory/getAllListwithSpecificField`, payload);
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const selectCompany = (state) => state?.company?.company;
export const { setCompany } = companySlice.actions;
export default companySlice.reducer;
