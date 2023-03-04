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
        spots.map((spot) => (<NavLink to={`/spots/${spot.id}`}><div key={spot.id}>{spot.city}</div></NavLink>))}
        </>
    )
}

export default LandingPage
