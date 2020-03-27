import React, { useState } from 'react';
//import Header from "./Header";
import "./global.css";
import Routes from "./routes";

function App() {
  return (
    <Routes />
  );

  /*const [contador, updateCont] = useState(0);
  function atualizar() {
    updateCont(contador + 1);
  }
  return (
    <div>
      <Header titulo="Semana OmniStack 11">
        Contador de click: {contador}
      </Header>
      <button onClick={atualizar}>Contar click</button>
    </div>
  );*/
}

export default App;
