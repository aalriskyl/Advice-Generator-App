import React, { useState, useEffect } from 'react';
import './App.css';
import Divider from './images/pattern-divider-desktop.svg';
import IconDice from './images/icon-dice.svg';


function App() {
  const [adviceData, setAdviceData] = useState('');

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = async () => {
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      if (!response.ok) {
        throw new Error('Failed to fetch advice');
      }
      const data = await response.json();
      setAdviceData(data.slip);
    } catch (error) {
      console.error('Error fetching advice:', error);
    }
  };
  const handleGenerateAdvice = () => {
    fetchAdvice();
  };
  return (
    <div className="App"> 
       <div className="container-box">
        {adviceData && (
          <div>
            <h1 className="container-title">Advice #{adviceData.id}</h1>
            <p>"{adviceData.advice}"</p>
            <img className="img-divider" src={Divider} alt="Divider" />
          </div>
        )}
        <img className="generate-button" src={IconDice} alt="Generate Advice" onClick={handleGenerateAdvice} />
      </div>
    </div>
  );
}

export default App;
