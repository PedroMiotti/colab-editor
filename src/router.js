import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

///Pages
//Pagina editor
import Editor from "./pages/editor/index";

//Pagina escolha sala
import MenuSala from "./pages/salas/index";

// Página para inserir nome de usuário
import PaginaNome from './pages/nomes/index.jsx';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/menu" component={MenuSala} />
      <Route exact path="/editor/:namespaceId" component={Editor} />
      <Route exact path="/nome" component={PaginaNome} />
    </Switch>
  );
};

export default Router;
