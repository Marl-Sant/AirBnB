import { csrfFetch } from './csrf';

const POPULATE_SPOTS = 'spots/populateSpots'
const SPOT_DETAIL = 'spots/spotDetail'
const UPDATE_SPOT = 'spots/updateSpot'
const ADD_IMAGE = 'spots/add_Image'

const updateSpot = (spot) => {
    return{
        type: UPDATE_SPOT,
        spot
    }
}

const addImageToSpot = (image) => {
    return{
        type:ADD_IMAGE,
        image
    }
}

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

export const getUserSpotsThunk = (user) => async dispatch => {
    const response = await csrfFetch('/api/spots')
    const data = await response.json()

    let filterSpots = Object.values(data)
    const ownerSpots = filterSpots.filter(spot => spot.ownerId === user.user.id)

    let ownedSpotsObj = {}

    ownerSpots.map(spot => ownedSpotsObj[spot.id]=spot)
    console.log(ownedSpotsObj)
    return dispatch(populateAllSpots(ownedSpotsObj))
}

export const addSpotThunk = (spot) => async dispatch => {
    
    const { address,city, state,country, lat, lng, name, description, price, images} = spot

     const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify({address, city, state,country, lat, lng, name,description, price})
    })

    if (response.ok){
        const newSpot = await response.json()
        console.log(newSpot)
        console.log(images)
        for await (let image of images){
            console.log(image,"image")
            let imageRes = await csrfFetch(`/api/spots/${newSpot.id}/images`,{
                method: 'POST',
                body: JSON.stringify(image)
            })
            console.log(image,"image")
            imageRes = await imageRes.json()
            console.log(imageRes, "IMAGE RES")
            dispatch(addImageToSpot(imageRes))
        }
        dispatch(showSpotDetail(newSpot))
        return newSpot
    }
    // const response = await csrfFetch('/api/spots', {
    //     method: 'POST',
    //     body: JSON.stringify(spot)
    // })

    // if (response.ok){
    //     const newSpot = await response.json()
    //     console.log(newSpot)
    //     return dispatch(showSpotDetail(newSpot.id))
    // }
}



const spotReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type) {
        case POPULATE_SPOTS:
        //    newState = {...state, ...action.spots}
           Object.values(action.spots).forEach(spot => newState[spot.id] = spot)
           return {...state, ...newState}
        case SPOT_DETAIL:
            newState = {...state}
            newState[action.spot.id] = action.spot
            if(newState[undefined]){
            delete newState['undefined']
            }
            return newState
        case ADD_IMAGE:
            return {...state, [action.image.id]: {...state[action.image.id]}}
        default:
        return state
    }
}

export default spotReducer;
