import "./App.css";
import CircleValue from "./components/CurrentTemp/CircleValue";
import Slider from "./components/CircleSlider/Slider";

function App() {
  return (
    <div className="App">
      <Slider min={5} max={30} groupAdress={null} />
      <CircleValue value={29} groupAdress={null} />
    </div>
  );
}

export default App;
