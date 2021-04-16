import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainPage from "./containers/MainPage/MainPage";
import ButtonAppBar from "./components/UI/AppBar";
import AlbumPage from './containers/AlbumPage/AlbumPage';
import TrackPage from "./containers/TrackPage/TrackPage";

const App = () => {

  return (
  <BrowserRouter>
    <ButtonAppBar/>
    <Switch>
        <Route path='/' exact component={MainPage}/>
        <Route path='/albums/:id' component={AlbumPage}/>
        <Route path='/tracks/:id' component={TrackPage}/>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
