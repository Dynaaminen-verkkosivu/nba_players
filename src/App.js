import { useState, useEffect } from 'react';
import './App.css';
import Click from './Click';

const URL = 'https://free-nba.p.rapidapi.com/players/?rapidapi-key=';
const API_KEY = 'API_KEY';

function App() {

  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [searchItem, setSearchItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch(URL + API_KEY)
      .then(res => res.json())
      .then(
        (result) => {
          setError(null);
          setIsLoaded(true);
          console.log(result.data)
          if (typeof result.data === 'undefined') {
            setError({ "message": 'Error retrieving info' })
          } else {
            setItems(result.data);
          }
          setItems(result.data);
        }, (error) => {
          setError(error);
          setIsLoaded(true);
          setItems([]);
        }
      )
  }, [])

  function close() {
    setSearchItem(null);
    setSearchTerm('');
  }

  if (searchItem != null) {
    return <Click
      first_name={searchItem.first_name}
      last_name={searchItem.last_name}
      position={searchItem.position}
      full_name={searchItem.team.full_name}
      division={searchItem.team.division}
      close={close}
    />;
  }

  if (error) {
    return <p>{error.message}</p>
  } else if (!isLoaded) {
    return <p>Loading...</p>
  } else {
    return (
      <div className="App">
        <h1>NBA PLAYERS</h1>
        <p className="info">Unofficial NBA API for Historical NBA Data</p>
        <input type="text" placeholder="Search player"
          onChange={e => {setSearchTerm(e.target.value);}} />

        {items.filter((item) => {
          if (searchTerm == '') {
            return item
          } else if (item.last_name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item
          } else if (item.first_name.toLowerCase().includes(searchTerm.toLowerCase())) {
            return item
          }
        }).map((item, id) => {
          return (
            <div key={id} onClick={e => setSearchItem(item)}>
              <p>{item.first_name} {item.last_name}</p>
            </div>
          );
        })}
      </div>
    )
  }
}

export default App;
