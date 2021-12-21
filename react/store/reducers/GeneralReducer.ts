export const GeneralReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            }
        case 'SET_LOADING':
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}