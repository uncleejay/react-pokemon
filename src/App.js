import React, { Component, Suspense } from "react";
import Error from "./components/Error/Error";
import Loading from "./components/Loading/Loading";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Welcome from "./pages/Welcome/Welcome";
import { PokemonProvider } from "./context/pokemon.context";

class App extends Component {
  state = {
    noInternetConnection: false
  };
  componentDidMount() {
    this.handleInternetConnectionChange();
    window.addEventListener("online", this.handleInternetConnectionChange);
    window.addEventListener("offline", this.handleInternetConnectionChange);
  }
  handleInternetConnectionChange = () => {
    navigator.onLine ? this.setState({ noInternetConnection: false }) : this.setState({ noInternetConnection: true });
  };
  render() {
    const { noInternetConnection } = this.state;
    if (noInternetConnection) {
      return <Error text="No Internet Connnection" />;
    }
    return (
      <PokemonProvider>
        <Suspense fallback={<Loading />}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Welcome />} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </PokemonProvider>
    );
  }
}

export default App;
