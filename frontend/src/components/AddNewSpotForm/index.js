import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addSpotThunk, getSpotDetail } from '../../store/spots';
import './AddNewSpotForm.css'

const CreateNewSpotForm = ({ hideForm }) => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0)
    const [firstImage, setFirstImage] = useState('')
    const [secondImage, setSecondImage] = useState('')
    const [thirdImage, setThirdImage] = useState('')
    const [fourthImage, setFouthImage] = useState('')
    const [fifthImage, setFifthImage] = useState('')

    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateFirstImage = (e) => setFirstImage(e.target.value)
    const updateSecondImage = (e) => setSecondImage(e.target.value)
    const updateThirdImage = (e) => setThirdImage(e.target.value)
    const updateFourthImage = (e) => setFouthImage(e.target.value)
    const updateFifthImage = (e) => setFifthImage(e.target.value)



    useEffect(() => {

    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
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
            images: [firstImage, secondImage, thirdImage, fourthImage, fifthImage]
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
        <section className='make-spot-container'>
            <h1>Create a new Spot</h1>
            <h3>Where's your place located?</h3>
            <p>Guests will only get your exact address once they booked a reservation.</p>
            <form onSubmit={handleSubmit} className='make-spot-container'>
                Country<input
                    className='country-street-title-price-image-fields'
                    type="text"
                    placeholder="Country"
                    value={country}
                    onChange={updateCountry} />
                Street Address<input
                className='country-street-title-price-image-fields'
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
                    className=''
                    type="text"
                    placeholder="City"
                    required
                    value={city}
                    onChange={updateCity} />,
                <input
                    className='street-field'
                    type="text"
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
                className='describe-text-area'
                    type="text"
                    value={description}
                    onChange={updateDescription} />
                <h2>Create a Title</h2>
                <h4>Catch guests' attention with a spot title that highlights what makes
your place special.</h4><input
                className='country-street-title-price-image-fields'
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={updateName} />
                    <div className='price-div'>
                <h2>Set a base price for your spot
</h2>
                <h4>Competitive pricing can help your listing stand out and rank higher
in search results.
</h4><div>$<input
                    className='country-street-title-price-image-fields'
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={updatePrice} />
                    </div>
                    </div>
                <h2>Liven up your spot with photos</h2>
                <h4>Submit a link to at least one photo to publish your spot.</h4>
                <input
                className='country-street-title-price-image-fields'
                    type="text"
                    placeholder="Preview Image URL"
                    required
                    value={firstImage}
                    onChange={updateFirstImage} />
                <input
                className='country-street-title-price-image-fields'
                    type="text"
                    placeholder="Second Image URL"
                    value={secondImage}
                    onChange={updateSecondImage} />
                <input
                className='country-street-title-price-image-fields'
                    type="text"
                    placeholder="Third Image URL"
                    value={thirdImage}
                    onChange={updateThirdImage} />
                <input
                className='country-street-title-price-image-fields'
                    type="text"
                    placeholder="Fourth Image URL"
                    value={fourthImage}
                    onChange={updateFourthImage} />
                <input
                className='country-street-title-price-image-fields'
                    type="text"
                    placeholder="Fifth Image URL"
                    value={fifthImage}
                    onChange={updateFifthImage} />
                <button type="submit" className='button-class-new-spot'>Create new Spot</button>
                <button type="button" className='button-class-no-spot' onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    );
};

export default CreateNewSpotForm
