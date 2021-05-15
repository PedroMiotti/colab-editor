import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

//Pages
//Pagina editor
import Editor from "./pages/editor/index";

//Pagina escolha sala
import MenuSala from "./pages/salas/index";

// Página para inserir nome de usuário
import PaginaNome from './pages/nomes/index.jsx';

// Página de Erro
import PaginaErro from './pages/error_404/index.jsx';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/menu" component={MenuSala} />
      <Route exact path="/editor" component={Editor} />
      <Route exact path="/editor/:namespaceId" component={Editor} />
      <Route exact path="/nome" component={PaginaNome} />
      <Route exact path="/erro" component={PaginaErro} />
      <Redirect to="/erro"/>
    </Switch>
  );
};

export default Router;
