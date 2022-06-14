import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Navigation } from "./routes/Navigation";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <RecoilRoot>
          <Navigation />
          <ReactQueryDevtools initialIsOpen={false} />
        </RecoilRoot>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
