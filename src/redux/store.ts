import { configureStore } from "@reduxjs/toolkit"
import invoiceReducer from '../modules/table/redux/tableReducer'

const store = configureStore({
    reducer: {
      invoice: invoiceReducer,
    },
  });
  
  export type RootState = ReturnType<typeof store.getState>;
  
  export default store;