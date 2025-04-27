import {API_URL} from '../../constants/env'
import MainHeader from '../organisms/MainHeader'
import './App.css'
import Home from "./components/pages/Home";
import Error404 from "./components/pages/Error404";
import MainHeader from "./components/organisms/MainHeader";


function Home() {
  return (
    <>
      <MainHeader /> 
      <h1>Bienvenido</h1>
      <p>Explora nuestros productos.</p>
    </>
  );
}

export default Home;


