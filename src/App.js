import './App.css';
import MainPage from './pages/MainPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div>
      <Switch>
        <Route exact path="/" component={MainPage}/>
      </Switch>
    </div>
  </Router>
  );
}
export default App;
