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
                    {spot.city}
                </div>
                )
                }
            </div>
        </>
    )
}
export default SpotDetailPage
