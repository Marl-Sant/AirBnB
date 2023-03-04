import { csrfFetch } from './csrf';

const POPULATE_SPOTS = 'spots/populateSpots'
const SPOT_DETAIL = 'spots/spotDetail'

const populateAllSpots = (spots) => {
    return {
        type: POPULATE_SPOTS,
        spots
    }
}

const showSpotDetail = (spot) => {
    return{
        type: SPOT_DETAIL,
        spot
    }
}

export const populateSpots = () => async dispatch => {
    const response = await fetch("/api/spots")
    const data = await response.json()
    dispatch(populateAllSpots(data))
}

export const getSpotDetail = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`)
    const data = await response.json()
    dispatch(showSpotDetail(data))
}

export const addSpotThunk = (spot) => async dispatch => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(spot)
    })

    if (response.ok){
        const newSpot = await response.json()
        console.log(newSpot)
        dispatch(showSpotDetail(newSpot.id))
    }
}

const spotReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case POPULATE_SPOTS:
        //    newState = {...state, ...action.spots}
           Object.values(action.spots).forEach(spot => newState[spot.id] = spot)
           return {...state, ...newState}
        case SPOT_DETAIL:
            newState = {...state, ...action.spot}
            return newState
        default:
        return state
    }
}

export default spotReducer;
