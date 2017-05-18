import React, {Component} from "react";
import {Tabs, Tab} from "material-ui/Tabs";
import AceEditor from "react-ace";
import Parser from "../parser";
import "brace/mode/c_cpp";
import "brace/theme/tomorrow";
import CreateIcon from "material-ui/svg-icons/content/create";
import SettingsIcon from "material-ui/svg-icons/action/settings";
import "../styles/Sidebar.scss";


export default class Sidebar extends Component {

    onChange(newCode) {
        this.props.updateCode(newCode);
        try {
            this.props.updateAST(Parser.getAST(newCode));
            this.props.setSyntaxErrors([]);
        }
        catch (error) {
            this.props.setSyntaxErrors([{
                row: error.hash.line,
                column: 0,
                type: 'error',
                text: error.message
            }]);
        }
    }

    componentDidMount() {
        this.props.updateAST(Parser.getAST(this.props.Code));
    }

    debounce(func, wait, immediate) {
        let timeout;
        return function () {
            let context = this, args = arguments;
            let later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            let callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    };

    render() {
        return <div id="Sidebar">
            <Tabs>
                <Tab icon={<CreateIcon/>} label="Editor">
                    <div className="TabContent">
                        <AceEditor
                            theme="tomorrow"
                            name="code_editor"
                            mode="c_cpp"
                            width="100%"
                            height={`${this.props.containerHeight - 65}px`}
                            fontSize="16px"
                            value={this.props.Code}
                            onChange={this.debounce(this.onChange, 500).bind(this)}
                            wrapEnabled={true}
                            annotations={this.props.SyntaxErrors}
                            focus={true}
                        />
                    </div>
                </Tab>
                <Tab icon={<SettingsIcon/>} label="Appearance">
                    <div className="TabContent">

                    </div>
                </Tab>
            </Tabs>
        </div>;
    }
}
