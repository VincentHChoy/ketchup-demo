import logo from './logo.svg';
import './App.css';
import {firestoreDB, db} from './firebase';
import { collection, getDocs } from "firebase/firestore";
import { useEffect } from 'react';

function App() {

  //example on reading data
  const readData = async () => {
    // attempts to fetch data for the referenced chart
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data().name}`);
    });

    }

  useEffect(() => {
    readData()
  }, [])

  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
