import React, { useContext } from 'react';
import { GeneralContext } from '../../store/context/GeneralContext';
import MinicartEdit from '../MinicartEdit/MinicartEdit';
import { Spinner } from 'vtex.styleguide'
import { useCssHandles } from 'vtex.css-handles'

const CSS_HANDLES = ['Spinner']

const Main = () => {
    const { state } = useContext(GeneralContext)
    const handles = useCssHandles(CSS_HANDLES)

    return (
        <>
            {state.error.error && <p>{state.error.message}</p>}
            {state.loading ?
                <div className={handles.Spinner}>
                    <Spinner />
                </div>
                :
                <MinicartEdit />
            }
        </>
    )
}

export default Main;