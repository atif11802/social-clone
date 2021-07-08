import { useSelector } from 'react-redux';
import './App.css';
import Login from './components/Login';
import Main from './components/Main';


function App() {
  const state = useSelector(state => state)
 
  return (
    <div className="app">
      {
        state.user ? ( <Main />)  : (
         <Login />
        )
      }
     
    </div>
  );
}

export default App;
