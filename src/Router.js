import React from 'react';
import {Switch, Route, BrowserRouter } from 'react-router-dom';

///Pages
//Pagina editor
import Editor from './pages/editor/index';

//Pagina escolha sala
import MenuSala from './pages/salas/index';


const Router = () =>{
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path="/editor" component={Editor} /> 
                {/* 
                Será usado assim futuramente (eu acho), para testes, manter a sem id (acima).
                <Route exact path="/editor/:id" component={Editor} /> 
                */}
                <Route exact path="/menu" component={MenuSala} />
            </Switch>
        </BrowserRouter>
        
    )
}

export default Router;