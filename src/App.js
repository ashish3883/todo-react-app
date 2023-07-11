import logo from './logo.svg';
import './App.css';
import ToDos from './components/Todos';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
      <NavBar title={'Todo App'} home={'Home'} aboutUs={'About Us'} />
      <div className='container'>
      <ToDos/>
      </div>
    </>
  );
}

export default App;
