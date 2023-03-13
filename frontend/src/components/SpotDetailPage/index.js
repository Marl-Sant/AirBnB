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

    
    let reviewCheck = []
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
                    <div className="spot-info">
                    <h1>{spot.name}</h1>
                    {spot.city},{spot.state},{spot.country}
                    </div>
                    <div className="spot-img">
                    {spot.SpotImages.map(image => <img src={image.url} key={image.id}/>)}
                    </div>
                    <div className="spot-descript">
                    {spot.description}
                    </div>
                    <div className="owner">
                    <h1>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>
                    </div>
                    <div className="booking">
                    <div className="book-price">
                    ${spot.price}night
                    </div>
                    <div className="book-star">
                    <i className='fa-solid fa-star' />{spot.avgStarRating ? spot.avgStarRating.toFixed(2) : 0}
                    </div>
                    <div className="book-review-count">
                    Number of Reviews{spotReviews.length}
                    </div>
                    </div>

                    <div btn-div>
                    <button className='button-class-no-maam'>Reserve Your Stay! (Feature Coming Soon)</button>
                    </div>

                    <div className="review-container">
                        <div className="review-stats">
                        <div className="review-star">
                            <i className='fa-solid fa-star' />{spot.avgStarRating ? spot.avgStarRating.toFixed(2) : 0}
                        </div>
                        <div className='review-count'>{spotReviews.length ? spotReviews.length : 'NEW'} reviews</div>
                        </div>
                        </div>
                    {spotReviews.reverse().map(review => 
                    <div className="rev-contains" key={review.id}>{review.review} 
                    {!sessionUser || sessionUser.id === review.userId && (<OpenModalMenuItem
                    itemText="Delete"
                    onItemClick={closeMenu}
                    modalComponent={<DeleteReviewModal reviewId={review.id} spotId={spot.id}/>}
                    />)}
                    </div>
                    )}

                    {!sessionUser || reviewCheck.length > 0 || sessionUser.id !== spot.ownerId && (<button className="fake-link"><OpenModalMenuItem
                itemText="Post Your Review"
                onItemClick={closeMenu}
                modalComponent={<PostAReviewModal spotId={spotId}/>}
                /></button>)}
                </div>
                )
                }
            </div>
        </>
    )
}
export default SpotDetailPage
