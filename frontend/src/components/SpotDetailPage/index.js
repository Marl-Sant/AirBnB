import React, { useEffect, useState } from "react";
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

    const closeMenu = () => setShowMenu(false);

    useEffect(() => {
        dispatch(spotActions.getSpotDetail(spotId)).then(dispatch(reviewActions.populateSpotReviews(spotId))).then(() => setIsLoaded(true))
    }, [dispatch, spotId])

    reviews = Object.values(reviews)
    const spotReviews = reviews.filter(review => review.spotId === Number(spotId))

    return (
        <>
            <div>
                {isLoaded && (<div>
                    <h1>{spot.name}</h1>
                    {spot.SpotImages.map(image => <img src={image.url}/>)}
                    <h2>{spot.city},{spot.state},{spot.country}</h2>
                    {spotReviews.map(review => 
                    <div>{review.review} <OpenModalMenuItem
                    itemText="Delete"
                    onItemClick={closeMenu}
                    modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spot.id}/>}
                    /></div>
                    )}
                    <h1>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>

                    <OpenModalMenuItem
                itemText="Post Your Review"
                onItemClick={closeMenu}
                modalComponent={<PostAReviewModal spotId={spotId}/>}
                />
                </div>
                )
                }
            </div>
        </>
    )
}
export default SpotDetailPage
