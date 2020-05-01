export const DOWNLOAD_DATA = 'DOWNLOAD_DATA'
export const SAVE_DATA_TO_ASYNC_STORAGE = 'SAVE_DATA_TO_ASYNC_STORAGE'
export const SET_DOCUMENT_KEYS = 'SET_DOCUMENT_KEYS'
export const SET_REDUXSTORE_FARMER = 'SET_REDUXSTORE_FARMER'
export const SET_REDUXSTORE_FARMERS = 'SET_REDUXSTORE_FARMERS'

// This action sets the auth user state
export const setUserState = (payload: any) => {
    return { type: 'SET_USER_STATE', payload }
}

// This action set the State and Lga for the mapping
export const setLocationData = (payload: any) => {
    return { type: 'SET_LOCATION_DATA', payload }
}

// This action set the famers bvn as keys aray in the redux store
export const setDocumentKeys = (payload: any) => {
    return { type: 'SET_DOCUMENT_KEYS', payload }
}

// This action set the current farmer as the redux store farmer
export const setReduxStoreFarmer = (payload: any) => {
    return { type: 'SET_REDUXSTORE_FARMER', payload }
}

// This action sets all the dowloaded farmers as the redux store farmers
export const setReduxStoreFarmers = (payload: any) => {
    return { type: 'SET_REDUXSTORE_FARMERS', payload }
}