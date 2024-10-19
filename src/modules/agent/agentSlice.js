import { createSlice } from "@reduxjs/toolkit";
import { agentPayload } from "./agentPayload";

const agentSlice = createSlice({
    name: 'agent',
    initialState: {
        agents: [],
        agent: null,
        paginateParams: agentPayload.paginateParams,
    },
    reducers: {
        setAgents: (state, action) => {
            state.agents = action.payload;
            return state;
        },
        setAgent: (state, action) => {
            state.agent = {...action.payload};
            return state;
        },
        setAgentPaginate: (state, action) => {
            state.paginateParams = action.payload;
            return state;
        }
    }
});

export const { setAgents, setAgent, setAgentPaginate } = agentSlice.actions;
export default agentSlice.reducer;