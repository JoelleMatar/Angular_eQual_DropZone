import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UsersDisplay from './components/UserDisplay/UsersDisplay';
import EditPopup from './components/EditUserPopup/EditPopup';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" component={UsersDisplay} />  
          <Route path="/editUser" component={EditPopup} />  
        </Switch>
      </Router>
  );
}

export default App;
