import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteASpotModal from '../DeleteASpotModal'


function CurrentUserSpots() {
    const dispatch = useDispatch()
    const [isLoaded, setIsLoaded] = useState(false)
    const [showMenu, setShowMenu] = useState(false);
    let spots = useSelector((state) => state.spots)
    let user = useSelector((state)=> state.session)
    spots = Object.values(spots)

    spots = spots.filter(spot=> spot.ownerId === user.user.id)

    useEffect(() => {
    dispatch(spotActions.getUserSpotsThunk(user)).then(()=> setIsLoaded(true))
    }, [dispatch])

    const closeMenu = () => setShowMenu(false);

    return (
        <>
        {isLoaded && 
        spots.map((spot) => 
        (<div key={spot.id}><NavLink to={`/spots/${spot.id}`}>
            <img src={spot.previewImage}/>{spot.city},{spot.state}{spot.avgStarRating}STARS {spot.price}PER NIGHT</NavLink>
            <button><NavLink to={`/spots/${spot.id}/edit`}>UPDATE</NavLink></button>
            <OpenModalMenuItem
                itemText="Delete"
                onItemClick={closeMenu}
                modalComponent={<DeleteASpotModal prop={spot}/>}
                />
            </div>))}
        </>
    )
}

export default CurrentUserSpots
