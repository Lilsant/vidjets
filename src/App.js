import "./App.css";
import CurrentTemp from "./components/CurrentTemp/CurrentTemp";
import CircleSlider from "./components/CircleSlider/CircleSlider";

function App() {
  return (
    <div className="App">
      <CircleSlider min={0} max={1000} currentTemp={50} groupAdress={null} />
      <CurrentTemp value={29} groupAdress={null} />
    </div>
  );
}

export default App;
