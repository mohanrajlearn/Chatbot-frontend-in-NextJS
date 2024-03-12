import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import roleReducer from "./slices/roleSlice";
import companyReducer from "./slices/companySlice";
import uiReducer from "./slices/uiSlice";
import appointmentReducer from "./slices/appointmentsSlice"

export default configureStore({
  reducer: {
    auth: authReducer,
    role: roleReducer,
    company: companyReducer,
    ui: uiReducer,
    appointments: appointmentReducer
  },
});
