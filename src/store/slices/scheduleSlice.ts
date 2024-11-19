import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    schedule: [] as ISchedule[],
}

interface ISchedule {
    scheduleId: string;
    categoryId: string;
    description: string;
}

const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setSchedule: (state, action: PayloadAction<ISchedule[]>) => {
            state.schedule = action.payload;
        }
    }
})

export const { setSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;