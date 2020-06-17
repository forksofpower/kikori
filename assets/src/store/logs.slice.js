import { createSlice, createEntityAdapter, createAsyncThunk } from "@reduxjs/toolkit"
import { normalize, schema } from "normalizr"
import { isEmpty } from "../helpers";

export const logEntity = new schema.Entity('logs');

const logsAdapter = createEntityAdapter();

const projectLogsURL = (id) => {
    return `http://localhost:4000/api/v1/projects/${id}/logs`
}
export const fetchLogs = createAsyncThunk(
    'logs/fetchLogs',
    async (project_id) => {
        let token = localStorage.getItem('token')
        const data = await fetch(projectLogsURL(project_id), {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(resp => resp.json())
        .then(resp => {
            // rehydrate message data
            resp.log_messages = resp.log_messages.map(log => {
                log.message = JSON.parse(log.message)
                return log
            })
            return resp
        })

        const normalized = normalize(data.log_messages, [logEntity])
        return normalized.entities;
    }
)

export const logSlice = createSlice({
    name: 'logs',
    initialState: logsAdapter.getInitialState({ isLoaded: false}),
    reducers: {
        addLog: (state, action) => {
            console.log(action)
            if (!isEmpty(action.payload)) {
                logsAdapter.upsertOne(state, action.payload)
            }
        },
        clearLogs: (state) => {
            logsAdapter.removeAll(state)
        }
    },
    extraReducers: {
        [fetchLogs.fulfilled]: (state, action) => {
            // insert logs
            if (!isEmpty(action.payload)) {
                logsAdapter.upsertMany(state, action.payload.logs)
            }
            if (!state.isLoaded) {
                state.isLoaded = true
            }
        }
    }
})

export const { addLog, clearLogs } = logSlice.actions;

export const {
    selectAll: selectAllLogs,
    selectById: selectLogById,
    selectIds: selectLogIds,
    selectTotal: selectTotalLogs,
    selectEntities
} = logsAdapter.getSelectors(state => state.logs)

export const selectLogsLoaded = state => state.logs.isLoaded;

export default logSlice.reducer