import React , {useState, useEffect} from "react";
import "./style.css";
import Weathercard from "./weathercard";

const Temp = () => {
    const [searchValue, setSearchValue] = useState("West Bengal");
    const [tempInfo, setTempInfo] = useState({});
    const getWeatherInfo = async()=>{
        try {
            let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=85be9feae694dbee92ee0b4e6a50beae`;
            const res =await fetch(url);
            const data =await res.json();
            // console.log(data);
            const {temp ,humidity,pressure} = data.main
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const {country, sunset} = data.sys;

            const myNewWeatherInfo ={
                temp ,
                humidity,
                pressure,
                weathermood,
                speed,
                name,
                country,
                sunset
            };
            setTempInfo(myNewWeatherInfo);

        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => { 
        getWeatherInfo();
    }, [])


    
  return (
    <>
      <div className="wrap">
        <div className="search">
          <input
            type="search"
            placeholder="search..."
            autoFocus
            id="search"
            className="searchTerm"
            value={searchValue}
            onChange={(e)=>{
                setSearchValue(e.target.value)
            }}
          />
          <button className="searchButton" type="button" onClick={getWeatherInfo}>
            Search
          </button>
        </div>
      </div>
    
    <Weathercard tempInfo={tempInfo}/>
    </>
  );
};

export default Temp;
