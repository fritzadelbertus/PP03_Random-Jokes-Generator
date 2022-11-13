import pun from './images/pun.png';
import dark from './images/tombstone.png';
import spooky from './images/spooky.png';
import christmas from './images/christmas.png';
import program from './images/program.png';
import misc from './images/misc.png';
import './App.css';
import { useState } from 'react';
import Axios from 'axios';

function App() {
  const [category, setCategory] = useState('');
  const [jokeText, setJokeText] = useState('');
  const getJoke = (type) => {
    Axios.get(`https://v2.jokeapi.dev/joke/${type}`)
      .then((response) => {
        setJokeText(`${response.data.type === 'single' ? response.data.joke : `${response.data.setup}... ${response.data.delivery}`}`)
        setCategory(
          response.data.category === 'Pun' ? pun :
          response.data.category === 'Dark' ? dark :
          response.data.category === 'Spooky' ? spooky :
          response.data.category === 'Christmas' ? christmas :
          response.data.category === 'Programming' ? program :
          misc
        )
      })
  };
  
  return (
    <div className="App">
      <div className="jokes-component">
        <div className="menu-bar">
          <button className="joke-type-button" onClick={() => {getJoke('Pun')}}>Pun</button>
          <button className="joke-type-button" onClick={() => {getJoke('Dark')}}>Dark</button>
          <button className="joke-type-button" onClick={() => {getJoke('Spooky')}}>Spooky</button>
          <button className="joke-type-button" onClick={() => {getJoke('Christmas')}}>Christmas</button>
          <button className="joke-type-button" onClick={() => {getJoke('Programming')}}>Programming</button>
          <button className="joke-type-button" onClick={() => {getJoke('Miscellaneous')}}>Misc</button>
        </div>
        <div className="jokes-card">
          <h1>Wanna Joke?</h1>
          <div className='joke-content'>
            <div className='icon-box'>
              <img 
                src={category !== '' ? category : pun}
                className="joke-icon"
                alt='icon'
              />
            </div>
            <p className="the-joke">
              {jokeText === '' ? 'Choose a joke' : jokeText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
