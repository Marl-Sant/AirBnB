import React, { useEffect, useState } from "react";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";



function SpotDetailPage() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const { spotId } = useParams()
    const spot = useSelector((state) => state.spots[spotId])

    useEffect(() => {
        dispatch(spotActions.getSpotDetail(spotId)).then(() => setIsLoaded(true))
    }, [dispatch, spotId])


    return (
        <>
            <div>
                {isLoaded && (<div>
                    <h1>{spot.name}</h1>
                    {spot.SpotImages.map(image => <img src={image.url}/>)}
                    <h2>{spot.city},{spot.state},{spot.country}</h2>
                    <h1>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h1>
                </div>
                )
                }
            </div>
        </>
    )
}
export default SpotDetailPage
