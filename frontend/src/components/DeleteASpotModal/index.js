import React from "react";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

function DeleteSpotModal(spot) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  let user = useSelector((state)=> state.session)

  const handleSubmit = (e) => {
    e.preventDefault();
  
    return dispatch(spotActions.deleteSpotThunk(spot.prop))
      .then(closeModal)
      .catch(
      );
  };

  return (
    <div>
      Are you sure you want to delete this spot? This action cannot be reversed.
      <button type='submit' onClick={handleSubmit}>Confirm</button>
      <button onClick={closeModal}>Cancel</button>
    </div>
  );
}

export default DeleteSpotModal;
