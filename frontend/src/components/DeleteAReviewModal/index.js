import React from "react";
import * as reviewActions from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

function DeleteReviewModal(reviewId, spotId) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  let user = useSelector((state)=> state.session)

  console.log(reviewId, spotId)

  const handleSubmit = (e) => {
    e.preventDefault();
  
    return dispatch(reviewActions.deleteASpotReview(reviewId.reviewId))
        .then(dispatch(reviewActions.populateSpotReviews(reviewId.spotId)))
      .then(closeModal)
      .catch(
      );
  };

  return (
    <div>
      Are you sure you want to delete this review? This action cannot be reversed.
      <button type='submit' onClick={handleSubmit}>Confirm</button>
    </div>
  );
}

export default DeleteReviewModal;
