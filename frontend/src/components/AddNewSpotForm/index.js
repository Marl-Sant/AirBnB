import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addSpotThunk } from '../../store/spots';


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
        };


        let newSpot = payload;
        if (newSpot) {
            dispatch(addSpotThunk(newSpot))
            history.push(`api/spots/${newSpot.id}`);
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
                Photos<input
                    type="text"
                    placeholder="Preview Image URL"
                    required
                    value={firstImage}
                    onChange={updateFirstImage} />
                <input
                    type="text"
                    placeholder="Second Image URL"
                    value={secondImage}
                    onChange={updateSecondImage} />
                <input
                    type="text"
                    placeholder="Third Image URL"
                    value={thirdImage}
                    onChange={updateThirdImage} />
                <input
                    type="text"
                    placeholder="Fourth Image URL"
                    value={fourthImage}
                    onChange={updateFourthImage} />
                <input
                    type="text"
                    placeholder="Fifth Image URL"
                    value={fifthImage}
                    onChange={updateFifthImage} />
                <button type="submit">Create new Spot</button>
                <button type="button" onClick={handleCancelClick}>Cancel</button>
            </form>
        </section>
    );
};

export default CreateNewSpotForm
