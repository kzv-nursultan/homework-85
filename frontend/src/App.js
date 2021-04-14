import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import MainPage from "./containers/MainPage/MainPage";
import ButtonAppBar from "./components/UI/AppBar";
import AlbumPage from './containers/AlbumPage/AlbumPage';

const App = () => {

  return (
  <BrowserRouter>
    <ButtonAppBar/>
    <Switch>
        <Route path='/' exact component={MainPage}/>
        <Route path='/albums/:id' component={AlbumPage}/>
    </Switch>
  </BrowserRouter>
  );
}

export default App;
