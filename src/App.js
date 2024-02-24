// App.js
import React, { useState, useEffect } from 'react';
import PlanetCard from './components/PlanetCard';
import Pagination from './components/Pagination';
import './App.css'

function App() {
  const [planets, setPlanets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [planetsPerPage] = useState(3); // Set the number of planets per page

  useEffect(() => {
    fetchPlanets('https://swapi.dev/api/planets/?format=json');
  }, []);

  const fetchPlanets = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPlanets(data.results); // Set all planets from API
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
  };

  const indexOfLastPlanet = currentPage * planetsPerPage;
  const indexOfFirstPlanet = indexOfLastPlanet - planetsPerPage;
  const currentPlanets = planets.slice(indexOfFirstPlanet, indexOfLastPlanet);

  return (
    <div>
      <h1 className='heading'>Star Wars Planets Directory</h1>
    <div className="app">
      {currentPlanets.map(planet => (
        <PlanetCard key={planet.name} planet={planet}  className='r'/>
      ))}
      
    </div>
    <Pagination
        planetsPerPage={planetsPerPage}
        totalPlanets={planets.length}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
