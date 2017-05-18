import React, {Component} from "react";
import $ from "jquery";
import ReactDOM from "react-dom";
import Guid from "guid";
import "../styles/Body.scss";
import Joint from "../joint";

export default class Body extends Component {

    constructor(props) {
        super(props);
        this.graph = new Joint.dia.Graph();
    }

    componentWillReceiveProps(nextProps) {
        this.paper.setDimensions("100%", nextProps.height);
        this.drawFlowchart(nextProps.AST);
    }

    drawState(text) {
        let id = Guid.raw();
        let state = new Joint.shapes.State({id: id, text: text});
        this.graph.addCells(state);
        return id;
    }

    drawCondition(text) {
        let id = Guid.raw();
        let state = new Joint.shapes.Condition({id: id, text: text});
        this.graph.addCells(state);
        return id;
    }

    drawActivity(text) {
        let id = Guid.raw();
        let activity = new Joint.shapes.Activity({id: id, text: text});
        this.graph.addCells(activity);
        return id;
    }

    drawLoop() {
        let id = Guid.raw();
        let loop = new Joint.shapes.Loop({id: id});
        this.graph.addCells(loop);
        return id;
    }

    drawConnection(source, target) {
        if (source && target) {
            let link = new Joint.shapes.link({
                source: {id: source.id},
                target: {id: target},
                connector: {name: 'rounded'},
                label: source.label || ''
            });
            this.graph.addCells(link);
        }
    }

    componentDidMount() {
        this.paper = new Joint.dia.Paper({
            linkPinning: false,
            linkConnectionPoint: Joint.util.shapePerimeterConnectionPoint,
            highlighting: {
                'default': {
                    name: 'stroke',
                    options: {
                        padding: 6,
                        attrs: {
                            'stroke-width': 4,
                            stroke: '#FFC107'
                        }
                    }
                }
            },
            el: ReactDOM.findDOMNode(this.refs.diagram),
            width: "100%",
            height: this.props.containerHeight,
            model: this.graph,
            interactive: false
        });

        this.drawFlowchart(this.props.AST);
    }

    alignCenter() {
        let paperWidth = $('.joint-paper').width();
        let paperHeight = $('.joint-paper').height();

        Joint.layout.DirectedGraph.layout(this.graph, {
            nodeSep: 100,
            edgeSep: 100,
            rankDir: "TB",
            setLinkVertices: true
        });

        this.paper.scale(1);
        let box = this.paper.getContentBBox();

        if (box.height < paperHeight) {
            let percent = (paperHeight - (box.height + 50)) / (paperHeight);
            this.paper.scale(1 + percent);
        }

        if (box.height > paperHeight) {
            let percent = (box.height - (paperHeight - 50)) / (box.height);
            this.paper.scale(1 - percent);
        }

        box = this.paper.getContentBBox();
        this.paper.translate((paperWidth - box.width) / 2, (paperHeight - box.height) / 2);
    }

    drawFlowchart(AST) {
        this.source = null;
        this.target = null;
        this.sources = [];
        this.graph.clear();
        this.traverseAST(AST);
        this.alignCenter();
    }

    traverseAST(AST) {
        if (AST == null) {
            return;
        }
        Object.keys(AST).forEach((key) => {
            if (key == 'children' && AST.type == 'while') {
                if (AST.children) {
                    this.source = {id: AST.id, label: 'True'};
                }
            }
            if (key == 'children' && AST.type == 'if') {
                if (AST.children) {
                    this.source = {id: AST.id, label: 'True'};
                }
            }
            if (key == 'else' && AST.type == 'if') {
                if (AST.children && AST.else) {
                    this.sources.push(this.source);
                }
                if (AST.children && !AST.else) {
                    this.sources.push({id: AST.id, label: 'False'});
                }
                if (!AST.children && AST.else) {
                    this.sources.push({id: AST.id, label: 'True'});
                }
                if (AST.else) {
                    this.source = {id: AST.id, label: 'False'};
                }
            }

            if (typeof AST[key] === 'object') {
                if (AST instanceof Array) {
                    return this.traverseAST(AST[key], parent);
                }
                else {
                    return this.traverseAST(AST[key], AST);
                }
            }

            if (key == 'type' && AST.type == 'if') {
                this.sources.enabled = true;
            }

            if (key == 'type' && AST.type == 'while') {
                if (AST.id != this.source.id) {
                    if (this.source.type != 'command') {
                        this.drawConnection({id: this.source.id, label: 'False'}, AST.id);
                    } else {
                        this.drawConnection({id: this.source.id, label: null}, AST.id);
                    }
                }
                this.source = {id: AST.id, label: 'False'};
                if (this.sources.enabled) {
                    this.sources.forEach((source) => {
                        this.drawConnection(source, AST.id);
                    });
                    this.sources = [];
                }
            }


            if (key == 'type' && AST.type == 'root' && this.source != null) {
                let target = this.drawState('Stop');
                this.drawConnection(this.source, target);
                this.sources.forEach((source) => {
                    this.drawConnection(source, target);
                });
                this.sources = [];
            }

            if (key == 'data') {
                if (AST.data != 'root') {
                    switch (AST.type) {
                        case 'command':
                            if (!this.source && !this.target) {
                                let target = this.drawActivity(AST.data);
                                this.source = {id: target, label: null};
                                this.drawConnection({id: this.drawState('Start'), label: null}, target);
                            }
                            else {
                                this.target = this.drawActivity(AST.data);
                                if (this.sources.enabled) {
                                    this.sources.forEach((source) => {
                                        this.drawConnection(source, this.target);
                                    });
                                    this.sources = [];
                                }
                                this.drawConnection(this.source, this.target);
                                this.source = {id: this.target, label: null, type: 'command'};
                            }
                            break;
                        case
                        'if':
                            if (!this.source && !this.target) {
                                let target = this.drawCondition(AST.data);
                                this.source = {id: target, label: null};
                                this.drawConnection({id: this.drawState('Start'), label: null}, target);
                                AST.id = target;
                            }
                            else {
                                this.target = this.drawCondition(AST.data);
                                if (this.sources.enabled) {
                                    this.sources.forEach((source) => {
                                        this.drawConnection(source, this.target);
                                    });
                                    this.sources = [];
                                }
                                this.drawConnection(this.source, this.target);
                                this.source = {id: this.target, label: null, type: 'if'};
                                AST.id = this.target;
                            }
                            break;
                        case 'while':
                            if (!this.source && !this.target) {
                                let target = this.drawCondition(AST.data);
                                this.source = {id: target, label: null};
                                this.drawConnection({id: this.drawState('Start'), label: null}, target);
                                AST.id = target;
                            }
                            else {
                                this.target = this.drawCondition(AST.data);
                                if (this.sources.enabled) {
                                    this.sources.forEach((source) => {
                                        this.drawConnection(source, this.target);
                                    });
                                    this.sources = [];
                                }
                                this.drawConnection(this.source, this.target);
                                this.source = {id: this.target, label: null, type: 'while'};
                                AST.id = this.target;
                            }
                            break;
                        default:

                            break;
                    }
                }
            }
        });
    }


    render() {
        return <div id="Body">
            <div ref="diagram"></div>
        </div>;
    }
}