import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import LandingPage from "./components/LandingPage";
import SpotDetailPage from "./components/SpotDetailPage";
import AddNewSpotForm from './components/AddNewSpotForm'
import CurrentUserSpots from './components/CurrentUserSpots'
import EditSpotForm from "./components/EditSpotForm";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path='/'>
            <LandingPage />
          </Route>
          <Route exact path ='/spots/current'>
            <CurrentUserSpots />
          </Route>
          <Route exact path ='/spots/new' component={AddNewSpotForm} />
          <Route exact path='/spots/:spotId/edit' component={EditSpotForm} />
          <Route exact path='/spots/:spotId'>
            <SpotDetailPage />
          </Route>
        </Switch>
      )}
      
    </>
  );
}

export default App;
