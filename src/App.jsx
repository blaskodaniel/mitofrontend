import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/Home';
import SelectFlightPage from './pages/SelectFlight';

const App = () => {
  return (
    <Switch>
      <Route path="/flight" component={SelectFlightPage} />
      <Route path="/" component={HomePage} />
    </Switch>
  );
};

export default App;
