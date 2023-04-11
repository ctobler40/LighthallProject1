import './App.css';
import React, { useState } from "react";

function App() {
  let [count, setCount] = useState(0);
  const [click, setClick] = useState(false);
  const pressCountButton = () => setClick(true);
  const incrementCount = () => {
    setCount(count + 1);
    console.log(window.location.href);
  }
  let [NATallies, setNATallies] = useState(0); let [SATallies, setSATallies] = useState(0); let [EUTallies, setEUTallies] = useState(0); let [ASTallies, setASTallies] = useState(0);
  let [AFTallies, setAFTallies] = useState(0); let [AUTallies, setAUTallies] = useState(0); let [ANTallies, setANTallies] = useState(0);
  const [location, showLocation] = useState(false);
  const handleLocation = () => showLocation(true);
  const [map, showMap] = useState(false);
  const handleMap = () => showMap(!map);
  const [saved, showSaved] = useState(false);
  const handleSaved = () => showSaved(!saved);
  if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
    if (click) {
      localStorage.setItem("incrementedCount", count);
      localStorage.setItem("NATallies", NATallies);
      localStorage.setItem("SATallies", SATallies);
      localStorage.setItem("EUTallies", EUTallies);
      localStorage.setItem("ASTallies", ASTallies);
      localStorage.setItem("AFTallies", AFTallies);
      localStorage.setItem("AUTallies", AUTallies);
      localStorage.setItem("ANTallies", ANTallies);
    }
    else {
      count=parseInt(localStorage.getItem("incrementedCount"));
      NATallies=parseInt(localStorage.getItem("NATallies"));
      SATallies=parseInt(localStorage.getItem("SATallies"));
      EUTallies=parseInt(localStorage.getItem("EUTallies"));
      ASTallies=parseInt(localStorage.getItem("ASTallies"));
      AFTallies=parseInt(localStorage.getItem("AFTallies"));
      AUTallies=parseInt(localStorage.getItem("AUTallies"));
      ANTallies=parseInt(localStorage.getItem("ANTallies"));
    }
  }  
  let [latitude, setLatitude] = useState(0);
  let [longitude, setLongitude] = useState(0);
  const GetPosition = () => {
    navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }
  const rerouteToGoogleMaps = (lat, long) => window.open('https://www.google.com/maps/@' + lat + ',' + long + ',13.92z', "_blank");

  const determineTally = (lat, long) => {
    if ((long > -155 && long < -15) && (lat > 14 && lat < 90) && location) {
      setNATallies(NATallies + 1);
    }
    else if ((long > -80 && long < -34) && (lat > -57 && lat < 14) && location) {
      setSATallies(SATallies + 1);
    }
    else if ((long > -10 && long < 35) && (lat > 34 && lat < 67) && location) {
      setEUTallies(EUTallies + 1);
    }
    else if ((long > 30 && long < 194) && (lat > 8 && lat < 85) && location) {
      setASTallies(ASTallies + 1);
    }
    else if ((long > -17 && long < 55) && (lat > -33 && lat < 37) && location) {
      setAFTallies(AFTallies + 1);
    }
    else if ((long > 100 && long < 165) && (lat > -44 && lat < 8) && location) {
      setAUTallies(AUTallies + 1);
    }
    else if (lat < -65 && location) {
      setANTallies(ANTallies + 1);
    }
  }

  return (
    <div className="App">
      <div className="App-header">
        Click Count: {parseInt(count)}
        <button className="GeneralButton" onClick={() => {incrementCount(); pressCountButton(); determineTally(latitude, longitude)}}>Increment</button>
        <button className="GeneralButton" onClick={() => {handleMap()}}>{map ? "Close" : "Geography"}</button>     
        <ul className={map ? 'MapMenuActive' : 'MapMenu'}> 
          <li className='MapItem'>
            <br></br>
            Geographic Information
            <br></br>
            <button className="GeneralButton" onClick={() => {handleLocation(); GetPosition()}}>Get Location</button>
            <br></br><br></br>
            Latitude: {latitude}
            <br></br>
            Longitude: {longitude}
            <br></br>
            <button className="GeneralButton" onClick={() => {rerouteToGoogleMaps(latitude, longitude)}}>Open In Maps</button>
            <button className="GeneralButton" onClick={() => {handleSaved()}}>{saved ? "Close" : "View Tallies"}</button>
          </li>
        </ul>
        <ul className={saved ? 'MapMenuActive' : 'MapMenu'}> 
          <li className='MapItem'>
            <br></br>
            Saved Locations - Tallies
            <br></br>
            <br></br>
            <div>North America: {NATallies}</div>
            <div>South America: {SATallies}</div>
            <div>Europe: {EUTallies}</div>
            <div>Asia: {ASTallies}</div>
            <div>Africa: {AFTallies}</div>
            <div>Austrailia: {AUTallies}</div>
            <div>Antarctica: {ANTallies}</div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default App;