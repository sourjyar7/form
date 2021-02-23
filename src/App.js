import './App.css';
import { AddUser } from './components/AddUser';
import { DisplayUsers } from './components/DisplayUsers';

function App() {
  return (
    <div className="App">
      <AddUser/>
      <DisplayUsers/>
    </div>
  );
}

export default App;
