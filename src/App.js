import './App.css';
import MainPage from './pages/MainPage'
import SecondPage from './pages/SecondPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
// import SecondPage from '/pages/SecondPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/Second" component={SecondPage}/>
      </Switch>
  </Router>
  );
}
export default App;
