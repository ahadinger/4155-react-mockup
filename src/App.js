import logo from './logo.svg';
import './App.css';
<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBLQfsdho-FW3f2lJuUIXFzfwWgsDDBCaw&callback=initMap"></script>
function App() {
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
