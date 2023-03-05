import { csrfFetch } from './csrf';

const ADD_SPOT_IMAGES = 'spots/ADD_SPOT_IMAGES'

const addImageToSpot = (spot, images) => {
    return{
        type:ADD_SPOT_IMAGES,
        payload: {spot, images}
    }
}

export const addImageThunk = (spot, images) => async dispatch => {

    console.log(spot)
    let pics = Object.values(images)
    const attachImages = pics.map((url, i) => {
        let obj
        if(i===0){
            return obj = {previewImage : true,
            url : url}
        }else{
            return obj = {previewImage : false,
                url : url}
        }
    })

    attachImages.forEach(async (image) => {
    const spotResponse = await csrfFetch(`/api/spots/${spot.id}`)

    let imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
        method: 'POST',
        body: JSON.stringify(image)
    })
    console.log(imageResponse)
    console.log(attachImages)
    if(imageResponse.ok && spotResponse.ok){
        imageResponse = await imageResponse.json()
        console.log(imageResponse,'INSIDE IF')
        const newSpot = await spotResponse.json()
        console.log(newSpot)
        dispatch(addImageToSpot(newSpot, imageResponse))
    }
    })

    // const spotResponse = await csrfFetch(`/api/spots/${spot.id}`)

    // let imageResponse = await csrfFetch(`/api/spots/${spot.id}/images`, {
    //     method: 'POST',
    //     body: JSON.stringify(firstPic, secondPic, thirdPic, fourthPic, fifthPic)
    // })
    // console.log(fifthPic, secondPic, thirdPic)
    // console.log(imageResponse)
    // console.log(attachImages)
    // if(imageResponse.ok && spotResponse.ok){
    //     imageResponse = await imageResponse.json()
    //     console.log(imageResponse,'INSIDE IF')
    //     const newSpot = await spotResponse.json()
    //     console.log(newSpot)
    //     dispatch(addImageToSpot(newSpot, imageResponse))
    // }
}

const spotImageReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type){
        case ADD_SPOT_IMAGES:
            console.log(action)
            newState = {...state, ...newState[action.payload.spot.id] = action.payload.spot}
            newState[action.payload.spot.id.SpotImages] = action.payload.images
            return newState
        default:
            return state
    }
}

export default spotImageReducer
