import React, { useState, useEffect } from 'react';

function PlanetCard({ planet }) {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [residentsVisible, setResidentsVisible] = useState(false);

  useEffect(() => {
    const fetchResidents = async () => {
      setLoading(true);
      if (planet.residents.length === 0) {
        setResidents([{ name: 'No residents found' }]);
        setLoading(false);
        return;
      }

      const residentPromises = planet.residents.map(residentUrl =>
        fetch(residentUrl).then(response => response.json())
      );
      const residentData = await Promise.all(residentPromises);
      setResidents(residentData);
      setLoading(false);
    };

    fetchResidents();
  }, [planet.residents]);

  const toggle = () => {
    setResidentsVisible(!residentsVisible);
  };

  return (
    <div className="planet-card">
      <h2 className='pname'>{planet.name}</h2>
      <span className='climate'> Climate    : </span><span className='getresc'>{planet.climate}</span><br/>
      <span className='climate'> Population : </span><span className='getresp'>{planet.population}</span><br/>
      <span className='climate'>Terrain     : </span><span className='getrest'> {planet.terrain}</span>
      <h3 className='res'>
        Residents :  <button className='cbut' type='button' onClick={toggle} style={{ cursor: 'pointer', background:"transparent" }}> {residentsVisible ? 'Click to Hide' : 'Click to Show'}</button>
      </h3>
      {residentsVisible && (
        <>
          <div className='feeo'>
            {loading ? (
              <p>Loading residents...</p>
            ) : (
              <ul className='feed'> 
                {residents.map((resident, index) => (
                  <li key={index} className='lii'>
                    {resident.name === 'No residents found' ? (
                      <p>No residents found for this planet.</p>
                    ) : (
                      <>
                        <span className='name'> Name : </span>{resident.name} <br />
                        <span className='gen'> Height : </span>{resident.height ? resident.height : 'Unknown'}<br/>
                        <span className='mass'>Mass : </span>{resident.mass ? `${resident.mass}kg` : 'Unknown'} <br />
                        <span className='gen'> Gender : </span>{resident.gender ? resident.gender : 'Unknown'}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default PlanetCard;
