import { csrfFetch } from "./csrf";

const POPULATE_REVIEWS = 'spots/populateReviews'
const ADD_REVIEWS = 'spots/addReviews'
const DELETE_REVIEW = 'spots/deleteReview'


const populateReviews = (reviews) => {
    return{
        type: POPULATE_REVIEWS,
        reviews
    }
}

const addAReview = (review) => {
    return{
        type: ADD_REVIEWS,
        review
    }
}

const deleteAReview = (reviewId) => {
    return{
        type: DELETE_REVIEW,
        reviewId
    }
}


export const populateSpotReviews = (spotId) => async dispatch =>{
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    const data = await response.json()
    dispatch(populateReviews(data))
}

export const addASpotReview = (reviewData) => async dispatch =>{
    let {review, stars, spotId} = reviewData
    
    spotId = Number(spotId.spotId)

    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method:'POST',
        body: JSON.stringify({review, stars})
    })
    const data = await response.json()
    dispatch(addAReview(data))

}

export const deleteASpotReview = (reviewId) => async dispatch=> {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method:'DELETE'
    })
    const data = await response.json()
    if(response.ok){
        dispatch(deleteAReview(data))
    }
}


const reviewReducer = (state = {}, action) => {
    let newState = {}
    switch (action.type){
        case POPULATE_REVIEWS:
            Object.values(action.reviews).forEach(review => newState[review.id] = review)
            return { ...newState}
        case ADD_REVIEWS:
            newState = {...state}
            newState[action.review.id] = action.review
            return newState
        case DELETE_REVIEW:
            newState = {...state}
            delete newState[action.reviewId]
            return newState
        default:
            return state
    }
}

export default reviewReducer;
