import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MainPage from "./containers/MainPage/MainPage";
import ButtonAppBar from "./components/UI/AppBar";
import AlbumPage from './containers/AlbumPage/AlbumPage';
import TrackPage from "./containers/TrackPage/TrackPage";
import UserSingIn from "./containers/Form/UserSingIn";
import UserSignUp from "./containers/Form/UserSignUp";
import TrackHistory from "./containers/TrackHistory/TrackHistory";

const App = () => {

  return (
  <BrowserRouter>
    <ButtonAppBar/>
    <Switch>
        <Route path='/' exact component={MainPage}/>
        <Route path='/albums/:id' component={AlbumPage}/>
        <Route path='/tracks/:id' component={TrackPage}/>
        <Route path='/login' component={UserSingIn} />
        <Route path='/register' component={UserSignUp}/>
        <Route path='/track_history' component={TrackHistory}/>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
