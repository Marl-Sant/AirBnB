import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addSpotThunk, getSpotDetail } from '../../store/spots';

const EditSpotForm = ({ hideForm }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const {spotId} = useParams()
    const editSpot = useSelector((state)=> state.spots[spotId])

    const [address, setAddress] = useState(editSpot.address);
    const [city, setCity] = useState(editSpot.city);
    const [state, setState] = useState(editSpot.state);
    const [country, setCountry] = useState(editSpot.country);
    const [lat, setLat] = useState(editSpot.lat);
    const [lng, setLng] = useState(editSpot.lng);
    const [name, setName] = useState(editSpot.name);
    const [description, setDescription] = useState(editSpot.description);
    const [price, setPrice] = useState(editSpot.price)

    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    useEffect(() => {

    }, []);

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
            //J'S CODE
            // images: [firstImage, secondImage, thirdImage, fourthImage, fifthImage]
        };
        
        let newSpot = await dispatch(addSpotThunk(payload))
        if (newSpot) {
            let spotId = newSpot.id
            history.push(`/spots/${spotId}`);
            dispatch(getSpotDetail(spotId))
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        hideForm();
    };

    return (
        <section>
            <form onSubmit={handleSubmit}>
                Country<input
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={updateCountry} />
                Street Address<input
                    type="text"
                    placeholder="Street address"
                    required
                    value={address}
                    onChange={updateAddress} />
                City<input
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={updateCity} />,
                State<input
                    type="text"
                    placeholder="State"
                    required
                    value={state}
                    onChange={updateState} />
                Latitude<input
                    type="number"
                    placeholder="Lat"
                    value={lat}
                    onChange={updateLat} />
                Longitude<input
                    type="number"
                    placeholder="Lng"
                    value={lng}
                    onChange={updateLng} />
                Describe your place to guests<input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={updateDescription} />
                Create a Title<input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={updateName} />
                Price<input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={updatePrice} />
                <button type="submit">Update</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    );
};

export default EditSpotForm
