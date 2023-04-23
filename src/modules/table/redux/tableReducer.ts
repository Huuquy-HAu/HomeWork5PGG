import { Invoice } from "../../../models/invoice";
import { PayloadAction, createReducer, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../redux/store";





interface InvoiceState {
    invoiceList: Invoice[];
}

const initialState: InvoiceState = {
    invoiceList: [],
};

const invoiceSlice = createSlice({
    name: 'invoice',
    initialState,
    reducers: {
        setInvoiceList(state, action: PayloadAction<Invoice[]>) {
            state.invoiceList = action.payload;
        },
        addInvoice(state, action: PayloadAction<Invoice>) {
            state.invoiceList.push(action.payload);
        },
        updateInvoice(state, action: PayloadAction<{ id: string; updatedInvoice: Invoice }>) {
            const index = state.invoiceList.findIndex((invoice) => invoice.id === action.payload.id);
            if (index !== -1) {
                state.invoiceList[index] = action.payload.updatedInvoice;
            }
        },
        deleteInvoice(state, action: PayloadAction<string>) {
            state.invoiceList = state.invoiceList.filter((invoice) => invoice.id !== action.payload);
        },
    },
});

export const { setInvoiceList, addInvoice, updateInvoice, deleteInvoice } = invoiceSlice.actions;

export const selectDataList = (state: RootState) =>
    state.invoice.invoiceList;

export default invoiceSlice.reducer;