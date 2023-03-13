import React from "react";
import * as reviewActions from "../../store/reviews";
import * as spotActions from '../../store/spots'
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteAReviewModal.css'

function DeleteReviewModal(reviewId, spotId) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();
    let user = useSelector((state) => state.session)

    const handleSubmit = (e) => {
        e.preventDefault();

      


        // const removeReview = dispatch(reviewActions.deleteASpotReview(reviewId.reviewId))
        //     await(dispatch(reviewActions.populateSpotReviews(reviewId.spotId)))
        //     await(dispatch(spotActions.getSpotDetail(reviewId.spotId)))
        //     (closeModal)

        // return removeReview
            
    };

    const handleDelete = async () => {

      


        const removeReview = dispatch(reviewActions.deleteASpotReview(reviewId.reviewId))
            await(dispatch(reviewActions.populateSpotReviews(reviewId.spotId)))
            await(dispatch(spotActions.getSpotDetail(reviewId.spotId)))
            
            closeModal()

        return removeReview
    }

    return (
        <div className="delete-container">
            <h1>Confirm Delete</h1>
            <h3>Are you sure you want to delete this review?</h3>
            <button type='submit' onClick={handleDelete} className="button-class-yes">Yes (Delete Review)</button>
            <button onClick={closeModal} className="button-class-no">No (Keep Review)</button>
        </div>
    );
}

export default DeleteReviewModal;
