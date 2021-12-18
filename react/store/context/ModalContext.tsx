import React, { useReducer } from 'react';
import { ModalReducer } from './../reducers/ModalReducer';

const initialState = {
    product: {},
    activeSku: {},
    images: [],
    colors: [],
    selectedColor: '',
    availableSkusPerColor: [],
    selectedSize: {}
}

export const ModalContext = React.createContext<{
    state: any;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
})


export const ModalProvider: React.FunctionComponent = ({ children }: any) => {
    const [state, dispatch] = useReducer(ModalReducer, initialState);
    return (
        <ModalContext.Provider value={{ state, dispatch }}>
            {children}
        </ModalContext.Provider>
    )
}