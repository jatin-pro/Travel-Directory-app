import React, { useState , useEffect} from "react";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import StarIcon from '@mui/icons-material/Star';
import * as L from "leaflet";
import "./app.css"
import axios from 'axios'; 
import swal from 'sweetalert';
import moment from 'moment'
import Login from './login';
import Register from './register'
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const AddMarkers = () => {
  const myStorage = window.localStorage;
  const [pins, setPins] = useState([]);
  const [currentUsername, setCurrentUsername] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newTitle , setTitle] = useState(null); 
  const [desc , setDesc] = useState(null); 
  const [newStar , setStar] = useState(0); 
  const [newPlace, setNewPlace] = useState(null);

  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const getPins = async () => {
      try {
        const allPins = await axios.get("https://traveldirectoryapp.herokuapp.com/pins");
        setPins(allPins.data);
      } catch (err) {
        console.log(err);
      }
    };
    getPins();
  }, []);

  const handleMarkerClick = (id) => {
    setCurrentPlaceId(id);
   };

  const LeafIcon = L.Icon.extend({
    options: {}
  });
  const blueIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|abcdef&chf=a,s,ee00FFFF"
  }),
  greenIcon = new LeafIcon({
    iconUrl:
      "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|2ecc71&chf=a,s,ee00FFFF"
  });
  const [icon, setIcon] = useState(greenIcon);

  const changeIconColor = (icon) => {
    if (icon.options.iconUrl === greenIcon.options.iconUrl) {
      setIcon((current) => (current = blueIcon));
    } else {
      setIcon((current) => (current = greenIcon));
    }
  };
  // const handleAddClick = (e) => {
  //   const [longitude, latitude] = e.lngLat;
  //   setNewPlace({
  //     lat: latitude,
  //     long: longitude,
  //   });
  // };
  
  const map = useMapEvents({
    click(e) {
      const newMarker = e.latlng;
      if(currentUsername)setNewPlace(newMarker);
    },
  })
     
  const handleSubmit = (e) => { 
 console.log(`submitted`); 
 

const newPin = {
  username: currentUsername,
  title : newTitle,
  description : desc,
  rating: newStar,
  lat: newPlace.lat,
  long: newPlace.lng,
};
axios.post("https://traveldirectoryapp.herokuapp.com/pins", newPin)
        .then(res => setPins([...pins, res.data]))
        .catch(error => {
          console.error('There was an error!', error);
        });
// try {
//   const res = axios.post("http://localhost:5000/pins", newPin);
//   setPins([...pins, res.data]);
//   setNewPlace(null);
// } catch (err) {
//   console.log(err);
// }
swal({
  title: "Review Added!",
  icon: "success",
  button: "back!",
  className: 'swal-wide',
});
};  

const handleLogout = () => {
  setCurrentUsername(null);
  myStorage.removeItem("user");
};

const handleDelete = (user,id) => { 
  if(user === currentUsername){        
     axios
    .delete("https://traveldirectoryapp.herokuapp.com/pins/" + id)
    .then((response) => { 
      swal({
      title: "Done!",
      text: "Review Deleted",
      icon: "success",
      timer: 2000,
      button: false})  }).catch(error => {
        console.error('There was an error!', error);
    });
  const del = pins.filter((el) => el._id !== id);
  setPins(del);}
}

  return (
    <>
      { pins.map((pin) => (
        <Marker position={[pin.lat, pin.long]} 
        
        >  
          <Popup>
            
            <div className="card">
                  <label>Place</label>
                 <div className="place">{pin.title}</div>
                  <label>Review</label>
                 <div className="desc">{pin.description}</div> 
                 <label>Rating</label>
                  <div >
                  {Array(pin.rating).fill(<StarIcon className="stars" />)}
                 
                </div>
                  <label>Information</label>
                 <div> <span className="username">
                    Created by <b>{pin.username}</b>
                  </span> </div><div>
                  <span className="date">{ moment(pin.createdAt).fromNow()} </span>
                  <IconButton aria-label="delete" size="small">
        <DeleteIcon fontSize="inherit"  
      onClick={() => handleDelete(pin.username, pin._id)} />
      </IconButton>
                  </div>
      
                </div>
            
          </Popup>
        </Marker>
      ))}
      {newPlace != null && (
            <Marker
            position={[newPlace.lat, newPlace.lng]} icon={icon}
            >
           
            <Popup >
            <div>
                <form onSubmit={handleSubmit}>
                  <label>Title</label>
                  <input
                    placeholder="Enter a title"
                    autoFocus
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label>Description</label>
                  <textarea
                    placeholder="Say something about this place."
                    onChange={(e) => setDesc(e.target.value)}
                  />
                  <label>Rating</label>
                  <select onChange={(e) => setStar(e.target.value)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="submit" className="submitButton">
                    Add Pin
                  </button>
                </form>
              </div>
            </Popup>
            </Marker>
        )}
        {currentUsername ? (
          <button className="button logout" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <div className="buttons">
            <button className="button login" onClick={() => setShowLogin(true)}>
              Log in
            </button>
            <button
              className="button register"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>
          </div>
        )}
        {showRegister && <Register setShowRegister={setShowRegister} />}
        {showLogin && (
          <Login
            setShowLogin={setShowLogin}
            setCurrentUsername={setCurrentUsername}
            myStorage={myStorage}
          />
        
        )}
       
    </>
  );
};

export default AddMarkers;
