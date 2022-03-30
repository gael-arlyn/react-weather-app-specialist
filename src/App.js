import Login from './components/Login';
import Scenario1 from './components/Scenario1';
import Scenario2 from './components/Scenario2';
import Scenario3 from './components/Scenario3';


const App = () => {
  return (
    <div className="app">
      <Scenario1/>
      <Scenario2/>
      <Scenario3/>
      <Login/>
    </div>
  );
}

export default App;
