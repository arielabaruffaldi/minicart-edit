import React, { useReducer } from 'react';
import { GeneralReducer } from '../reducers/GeneralReducer';

const initialState = {
    error: {
        status: false,
        message: ""
    },
    loading: false,
}

export const GeneralContext = React.createContext<{
    state: any;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
})


export const GeneralProvider: React.FunctionComponent = ({ children }: any) => {
    const [state, dispatch] = useReducer(GeneralReducer, initialState);
    return (
        <GeneralContext.Provider value={{ state, dispatch }}>
            {children}
        </GeneralContext.Provider>
    )
}