import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';


function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul id='main-element'>
      <div className='home-icon'>
      <li>
        <NavLink exact to="/"><i className="fa-brands fa-airbnb" />airbnb</NavLink>
      </li>
      </div>
      {isLoaded && (
        <div className='profile-button'>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
        </div>
      )}
      {!sessionUser || (
        <div  className='create-new-spot'>
      <li>
        <NavLink to="/spots/new">Create a New Spot</NavLink>
      </li>
      </div>
      )}
    </ul>
  );
}

export default Navigation;
