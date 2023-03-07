import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";



function CurrentUserSpots() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    let spots = useSelector((state) => state.spots)
    let user = useSelector((state)=> state.session)
    spots = Object.values(spots)

    spots = spots.filter(spot=> spot.ownerId === user.user.id)

    useEffect(() => {
    dispatch(spotActions.getUserSpotsThunk(user)).then(()=> setIsLoaded(true))
    }, [dispatch, user])

    return (
        <>
        {isLoaded && 
        spots.map((spot) => 
        (<div key={spot.id}><NavLink to={`/spots/${spot.id}`}>
            {spot.city},{spot.state}{spot.avgStarRating}STARS {spot.price}PER NIGHT</NavLink>
            <button><NavLink to={`/spots/${spot.id}/edit`}>UPDATE</NavLink></button><button>DELETE</button></div>))}
        </>
    )
}

export default CurrentUserSpots
