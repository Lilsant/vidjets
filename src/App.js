import "./App.css";
import CircleValue from "./components/CircleValue";
import Slider from "./components/slider_vidjet";
import TestSlider from "./components/TestSlider";
import Clock from "./components/Clock";

function App() {
  return (
    <div className="App">
      <TestSlider min={0} max={3000} />
      <TestSlider min={0} max={2000} />
      <TestSlider min={0} max={40000} />
      <Slider />
      <CircleValue value={100} />
      <TestSlider />
      <Clock />
    </div>
  );
}

export default App;
