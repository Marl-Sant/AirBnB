import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addSpotThunk, getSpotDetail, getUserSpotsThunk, populateSpots } from '../../store/spots';
import { editSpotThunk } from '../../store/spots';
import './EditForm.css'

const EditSpotForm = ({spot, hideForm }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    let { spotId } = useParams()
    const editSpot = useSelector((state) => state?.spots[spotId])
    const user = useSelector((state)=> state?.session?.user)
    const [isLoaded, setIsLoaded] = useState(false)
    console.log(spotId)
    console.log(editSpot)
    
    useEffect(() => {
        dispatch(populateSpots()).then(() => setIsLoaded(true))
    }, [dispatch]);

    const [address, setAddress] = useState(editSpot?.address);
    const [city, setCity] = useState(editSpot?.city);
    const [state, setState] = useState(editSpot?.state);
    const [country, setCountry] = useState(editSpot?.country);
    const [lat, setLat] = useState(editSpot?.lat);
    const [lng, setLng] = useState(editSpot?.lng);
    const [name, setName] = useState(editSpot?.name);
    const [description, setDescription] = useState(editSpot?.description);
    const [price, setPrice] = useState(editSpot?.price)

    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...editSpot,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price,
        };

        let editedSpot = await dispatch(editSpotThunk(payload))
        let spotId = editedSpot.spot.id
        if (editedSpot) {
            history.push(`/spots/${spotId}`)
            dispatch(getSpotDetail(spotId))
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    };

    return (<div>
        {isLoaded && ( <div>
        <section className='edit-spot-container'>
            <h1>Edit your Spot</h1>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form className='edit-spot-container' onSubmit={handleSubmit}>
                Country<input
                    className='edit-country-street-title-price-image-fields'
                    type="text"
                    placeholder="Country"
                    value={country}
                    defaultValue={editSpot?.country}
                    onChange={updateCountry} />
                Street Address<input
                  className='edit-country-street-title-price-image-fields'
                    type="text"
                    placeholder="Street address"
                    required
                    value={address}
                    onChange={updateAddress} />
                    <div>
                    City, State
                </div>
                <div className='city-state-div'>
                <input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={updateCity} />,
                State<input
                    type="text"
                    className='street-field'
                    placeholder="State"
                    required
                    value={state}
                    onChange={updateState} />
                    </div>
                    <div>Latitude / Longitude (optional)</div>
                    <div className='city-state-div'>
                <input
                    type="number"
                    placeholder="Lat"
                    value={lat}
                    onChange={updateLat} />
                <input
                    type="number"
                    placeholder="Lng"
                    value={lng}
                    onChange={updateLng} />
                    </div>
                    <h2>Describe your place to guests</h2>
                <h4>Mention the best features of your space, any special amentities like
fast wif or parking, and what you love about the neighborhood.</h4><input
                    type="text"
                    className='describe-text-area'
                    placeholder="Description"
                    value={description}
                    onChange={updateDescription} />
                <h2>Create a Title</h2>
                <h4>Catch guests' attention with a spot title that highlights what makes
your place special.</h4><input
className='edit-country-street-title-price-image-fields'
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={updateName} />
                <h2>Set a base price for your spot
</h2>
                <h4>Competitive pricing can help your listing stand out and rank higher
in search results.
</h4><div>$<input
                    type="number"
                    className='edit-country-street-title-price-image-fields'
                    placeholder="Price"
                    value={price}
                    onChange={updatePrice} />
                    </div>
                <button type="submit" className='button-class-new-spot'>Update</button>
            </form>
        </section>
    </div>)}

</div>

    );
};

export default EditSpotForm
