import "./App.css";
import CircleValue from "./components/CircleValue";
import Slider from "./components/slider_vidjet";
import TestSlider from "./components/TestSlider";

function App() {
  return (
    <div className="App">
      <TestSlider />
      <TestSlider />
      <TestSlider />
      <Slider />
      <CircleValue value={100} />
      <TestSlider />
    </div>
  );
}

export default App;
