import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

///Pages
//Pagina editor
import Editor from "./pages/editor/index";

//Pagina escolha sala
import MenuSala from "./pages/salas/index";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/menu" component={MenuSala} />
      <Route exact path="/editor/:namespaceId" component={Editor} />
    </Switch>
  );
};

export default Router;
