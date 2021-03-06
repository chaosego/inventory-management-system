import { createReducer, on } from '@ngrx/store';
import { Stockroom } from '@inv/core';
import { createStockroomSuccess, deleteStockroomSuccess, getStockroomsSuccess, setSelectedStockroom, updateStockroomSuccess, getStockroomSummariesSuccess } from '../actions/stockroom.actions'; 
import { initialStockroomState } from '../state/stockroom.state';

const _stockroomReducer = createReducer(
  initialStockroomState,
  on(getStockroomsSuccess, (state, { payload }) => {
    return {
      ...state,
      stockrooms: payload
    }
  }),
  on(getStockroomSummariesSuccess, (state, { payload }) => {
    return {
      ...state,
      stockroomSummaries: payload
    }
  }),
  on(createStockroomSuccess, (state, { payload }) => {
    const stockrooms: Stockroom[] = state.stockrooms.map(s => s);
    stockrooms.push(payload);
    return {
      ...state,
      stockrooms: stockrooms,
      selectedStockroom: payload
    }
  }),
  on(updateStockroomSuccess, (state, { payload }) => {
    const stockrooms: Stockroom[] = state.stockrooms.filter(s => s.id !== payload.id);
    stockrooms.push(payload);
    return {
      ...state,
      stockrooms: stockrooms,
      selectedStockroom: state.selectedStockroom
    };
  }),
  on(deleteStockroomSuccess, (state, { payload }) => {
    return {
      ...state,
      stockroomSummaries: state.stockroomSummaries.filter(s => s.stockroom.id !== payload.id),
      stockrooms: state.stockrooms.filter(s => s.id !== payload.id),
      selectedStockroom: state.selectedStockroom,
    };
  }),
  on(setSelectedStockroom, (state, stockroom) => {
    return {
      ...state,
      selectedStockroom: stockroom
    }
  }),
);

export function stockroomReducer(state, action) {
  return _stockroomReducer(state, action);   
}
