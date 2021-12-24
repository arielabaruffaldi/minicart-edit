import React, { useContext } from 'react';
import { GeneralContext } from '../../store/context/GeneralContext';
import MinicartEdit from '../MinicartEdit/MinicartEdit';
import { Spinner } from 'vtex.styleguide'

const Main = () => {
    const { state } = useContext(GeneralContext)
    console.log("STATE___", state)
    return (
        <>
            {state.error.error && <p>{state.error.message}</p>}
            {state.loading ?
                <Spinner />
                :
                <MinicartEdit />
            }
        </>
    )
}

export default Main;