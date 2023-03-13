import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import OpenModalMenuItem from '../Navigation/OpenModalMenuItem';
import DeleteASpotModal from '../DeleteASpotModal'
import './CurrentUserSpots.css'


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
        <div>
            <h1>Manage Spots</h1>
        <div className="current-spots-container">
        {isLoaded && 
        spots.map((spot) => 
        (<div className='spot-card' key={spot.id}><NavLink to={`/spots/${spot.id}`}>
            <img className="spot-img" src={spot.previewImage}/>
            <div className="spot-info">{spot.city},{spot.state}</div>
            <div className="spot-price">${spot.price} night</div>
            <div className="spot-info spot-star">{spot.avgStarRating || ('NEW')}<i className='fa-solid fa-star' /></div> 
            </NavLink>
            <div>
            <button className="button-class-update-spot"><NavLink to={`/spots/${spot.id}/edit`}>UPDATE</NavLink></button>
            <button className="button-class-delete-spot"><OpenModalMenuItem
                itemText="Delete"
                className='remove-line'
                onItemClick={closeMenu}
                modalComponent={<DeleteASpotModal prop={spot}/>}
                /></button>
            </div>
            </div>))}
        </div>
        </div>
    )
}

export default CurrentUserSpots
