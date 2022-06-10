import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Navigation } from "./routes/Navigation";
function App() {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Navigation />
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
