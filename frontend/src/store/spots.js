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

const addImageToSpot = (spotId, image) => {
    return{
        type:ADD_IMAGE,
        payload: {spotId, image}
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

        const attachImages = images.map((url, i) => {
            let obj
            if(i===0){
                return obj = {previewImage : true,
                url : url}
            }else{
                return obj = {previewImage : false,
                    url : url}
            }
        })

        console.log(attachImages)

        for await (let image of attachImages){
            const {previewImage, url} = image
            console.log(image,"IMAGE", previewImage, "PRE IMG", url, "URL")
            let imageRes = await csrfFetch(`/api/spots/${newSpot.id}/images`,{
                method: 'POST',
                body: JSON.stringify({previewImage: previewImage, url: url})
            })
            console.log(imageRes, "BEFORE JSON IMAGE RES")
            imageRes = await imageRes.json()
            console.log(imageRes, "IMAGE RES JSON")
            dispatch(addImageToSpot(newSpot.id, imageRes))
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

export const editSpotThunk = (spot) => async dispatch => {

    const {address, city, state, country, lat, lng, name, description, price} = spot 

    const response = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        body: JSON.stringify({address, city, state, country, lat, lng, name, description, price})
    })
    
    const data = await response.json()

    if(response.ok){
        return dispatch(updateSpot(data))
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
            newState = {...state}
            newState[action.spot.id] = action.spot
            if(newState[undefined]){
            delete newState['undefined']
            }
            return newState
        case ADD_IMAGE:
            return {...state, [action.payload.spotId]: {...state, [action.payload.spotId.SpotImages]: action.payload.image}}
        case UPDATE_SPOT:
            return {...state, [action.spot.id]: {...state, ...action.spot}}
        default:
        return state
    }
}

export default spotReducer;
