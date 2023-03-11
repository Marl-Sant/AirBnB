import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";



function LandingPage() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    let spots = useSelector((state) => state.spots)
    spots = Object.values(spots)

    useEffect(() => {
    dispatch(spotActions.populateSpots()).then(()=> setIsLoaded(true))
    }, [dispatch])


    return (
        <>
        {isLoaded && 
        spots.map((spot) => (<div key={spot.id}>
            <NavLink to={`/spots/${spot.id}`}>
            <img src={spot.previewImage}/>
            <p>{spot.city},{spot.state}</p>
            <p>${spot.price}night</p>
            <p>{spot.avgStarRating} STARS</p>
            </NavLink>
            </div>))}
        </>
    )
}

export default LandingPage
