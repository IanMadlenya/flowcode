import React, {Component} from "react";
import Sidebar from "../containers/SidebarContainer";
import Body from "../containers/BodyContainer";
import Dimensions from "react-dimensions";
import "../styles/App.scss";

class App extends Component {
    render() {
        return <div id="container">
            <Sidebar containerHeight={this.props.containerHeight}/>
            <Body containerHeight={this.props.containerHeight}/>
        </div>;
    }
}

export default Dimensions()(App);



