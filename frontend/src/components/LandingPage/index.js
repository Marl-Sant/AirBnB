import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import './LandingPage.css'



function LandingPage() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    let spots = useSelector((state) => state.spots)
    spots = Object.values(spots)

    useEffect(() => {
    dispatch(spotActions.populateSpots()).then(()=> setIsLoaded(true))
    }, [dispatch])


    return (
        <div className="container">
        {isLoaded && 
        spots.map((spot) => (<div className='card' key={spot.id}>
            <NavLink to={`/spots/${spot.id}`}>
            <img className="img" src={spot.previewImage}/>
            <div className="info">{spot.city},{spot.state}</div>
            <div className="price">${spot.price} night</div>
            <div className="info star">{spot.avgStarRating ? spot.avgStarRating.toFixed(2) : 'New'}<i className='fa-solid fa-star' /></div>
            </NavLink>
            </div>))}
        </div>
    )
}

export default LandingPage
