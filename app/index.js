import React from "react";
import {createStore} from "redux";
import {Provider} from "react-redux";
import Reducer from "./reducers";
import ReactDOM from "react-dom";
import App from "./components/App";
import InitialState from "./initialState";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from "react-tap-event-plugin";

injectTapEventPlugin();

let store = createStore(Reducer, InitialState);

// here's the start point of react render process
ReactDOM.render(
    <MuiThemeProvider>
        <Provider store={store}>
            <App/>
        </Provider>
    </MuiThemeProvider>,
    document.getElementById('root')
);