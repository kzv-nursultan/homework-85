import './App.css';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import MainPage from "./containers/MainPage/MainPage";
import ButtonAppBar from "./components/UI/AppBar";
import AlbumPage from './containers/AlbumPage/AlbumPage';
import TrackPage from "./containers/TrackPage/TrackPage";
import UserSingIn from "./containers/Form/UserSingIn";
import UserSignUp from "./containers/Form/UserSignUp";
import TrackHistory from "./containers/TrackHistory/TrackHistory";
import AddPublication from "./containers/Form/AddPublication";
import {useSelector} from "react-redux";
import AddArtist from "./containers/Form/AddArtist";
import AddAlbum from "./containers/Form/AddAlbum";
import AddTrack from "./containers/Form/AddTrack";

const App = () => {

  const user = useSelector(state=>state?.users?.loginUser.user);

  const ProtectedRoute = ({isAllowed, redirectTo, ...props}) => {
    return isAllowed ?
      <Route {...props}/> :
      <Redirect to={redirectTo}/>
  };

  return (
  <BrowserRouter>
    <ButtonAppBar/>
    <Switch>
        <Route path='/' exact component={MainPage}/>
        <Route path='/albums/:id' component={AlbumPage}/>
        <Route path='/tracks/:id' component={TrackPage}/>
        <Route path='/login' component={UserSingIn} />
        <Route path='/register' component={UserSignUp}/>
        <ProtectedRoute
          path='/track_history'
          component={TrackHistory}
          isAllowed={user && user.token}
          redirectTo='/login'
        />
        <ProtectedRoute
          path='/add'
          exact
          component={AddPublication}
          isAllowed={user && user.role === 'user'}
          redirectTo='/login'
          />

        <ProtectedRoute
          path='/add_artist'
          exact
          component={AddArtist}
          isAllowed={user && user.role === 'user'}
          redirectTo='/login'
        />

      <ProtectedRoute
        path='/add_album'
        exact
        component={AddAlbum}
        isAllowed={user && user.role === 'user'}
        redirectTo='/login'
      />

      <ProtectedRoute
        path='/add_track'
        exact
        component={AddTrack}
        isAllowed={user && user.role === 'user'}
        redirectTo='/login'
      />

    </Switch>
  </BrowserRouter>
  );
}

export default App;
