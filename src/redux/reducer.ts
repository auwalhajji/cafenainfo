const defaultState = {
    user: {},
    locationData: {
        state: '',
        lga: ''
    },
    reduxStoreKeys: {

    },
    reduxStoreFarmer: {

    },
    reduxStoreFarmers: {
        farmers: []
    }

}

function reducer(state = defaultState, { type, payload} : {type: string, payload: any}): any {
    // Work with state
    switch(type) {
        case 'SET_USER_STATE' :
            return {
                ...state,
                user: {
                    username: payload.split('@')[0]
                }
            }
        case 'SET_LOCATION_DATA' :
            return {
                ...state,
                locationData: {
                    statex: payload.stat,
                    lgax: payload.lga
                }
            }
        case 'SET_DOCUMENT_KEYS' : 
            return {
                ...state,
                reduxStoreKeys: {
                    allKeys: payload
                }

            }
        case 'SET_REDUXSTORE_FARMER' :
            return {
                ...state,
                reduxStoreFarmer: {
                    farmer: payload
                }
            }
        case 'SET_REDUXSTORE_FARMERS' :
            return {
                ...state,
                reduxStoreFarmers: {
                    farmers: payload
                }
            }
    }

    return state
}
export default reducer