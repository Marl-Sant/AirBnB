import React, { useEffect, useState } from "react";
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews"
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouteMatch } from "react-router-dom";
import PostAReviewModal from "../PostAReviewModal";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteReviewModal from '../DeleteAReviewModal'

function SpotDetailPage() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots)
    let reviews = useSelector((state) => state.reviews)
    const sessionUser = useSelector((state) => state.session.user)
    const match = useRouteMatch('/spots/:spotId/edit')

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(spotActions.getSpotDetail(spotId)).then(dispatch(reviewActions.populateSpotReviews(spotId))).then(() => setIsLoaded(true))
    }, [dispatch, spotId])

    
    let reviewCheck
    reviews = Object.values(reviews)
    const spotReviews = reviews.filter(review => review.spotId === Number(spotId))
    if(sessionUser){
        reviewCheck = reviews.filter(review => review.userId === sessionUser.id)
    }
    console.log(reviewCheck)
    console.log(spotReviews)

    return (
        <>
            <div>
                {isLoaded && (<div>
                    <h1>{spot.name}</h1>
                    {spot.city},{spot.state},{spot.country}
                    {spot.SpotImages.map(image => <img src={image.url} key={image.id}/>)}
                    <h2>{spot.city},{spot.state},{spot.country}</h2>
                    {spotReviews.reverse().map(review => 
                    <div key={review.id}>{review.review} 
                    {!sessionUser || sessionUser.id === review.userId && (<OpenModalMenuItem
                    itemText="Delete"
                    onItemClick={closeMenu}
                    modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spot.id}/>}
                    />)}
                    </div>
                    )}
                    <h1>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>
                    {spot.description}
                    ${spot.price}night
                    STAR{spot.avgStarRating}
                    Number of Reviews{spotReviews.length}

                    {!sessionUser || reviewCheck.length || sessionUser.id !== spot.ownerId && (<OpenModalMenuItem
                itemText="Post Your Review"
                onItemClick={closeMenu}
                modalComponent={<PostAReviewModal spotId={spotId}/>}
                />)}
                </div>
                )
                }
            </div>
        </>
    )
}
export default SpotDetailPage
