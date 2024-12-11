import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const createIncident = createAsyncThunk(
  'incidents/create',
  async (incidentData: any) => {
    const response = await api.post('/incidents', incidentData);
    return response.data;
  }
);

export const fetchIncidents = createAsyncThunk(
  'incidents/fetch',
  async () => {
    const response = await api.get('/incidents');
    return response.data;
  }
);

const incidentSlice = createSlice({
  name: 'incidents',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createIncident.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.list = action.payload;
      });
  },
});