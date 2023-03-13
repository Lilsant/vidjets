import "./App.css";
import CircleValue from "./components/CircleValue";
import Slider from "./components/slider_vidjet";
import TestSlider from "./components/TestSlider";

function App() {
  return (
    <div className="App">
      <TestSlider min={20} max={30} />
      <TestSlider min={0} max={2000} />
      <TestSlider min={0} max={40000} />
      <Slider />
      <CircleValue value={100} />
      <TestSlider />
    </div>
  );
}

export default App;
