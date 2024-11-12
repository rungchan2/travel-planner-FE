import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
};

interface PlannerState {
  title: string;
  location: string;
  dateRange: DateRange;
};

const initialState: PlannerState = {
  title: '',
  location: '',
  dateRange: {
    startDate: null,
    endDate: null,
  },
};

const plannerSlice = createSlice({
  name: 'planner',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
    },
    setDateRange: (state, action: PayloadAction<DateRange>) => {
      state.dateRange = action.payload;
    },
  },
});

export const { setTitle, setLocation, setDateRange } = plannerSlice.actions;
export const plannerReducer = plannerSlice.reducer;
