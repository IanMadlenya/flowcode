import Joint from "jointjs";

export default class State extends Joint.shapes.basic.Rect {
    constructor(props) {
        super(props);
        this.set('size', {width: 65, height: 40});
        this.attr('rect', {
            fill: {
                type: 'linearGradient',
                stops: [
                    {offset: '0%', color: '#9FA8DA'},
                    {offset: '100%', color: '#7986CB'}
                ]
            }, 'stroke': '#5C6BC0', 'stroke-width': 1, rx: 25, ry: 25
        });
        this.attr('text', {text: props.text, fill: 'white', 'font-size': 13});
        this.attr('text/filter', {name: 'dropShadow', args: {dx: 0, dy: 0, blur: 1}});
        this.attr('rect/filter', {name: 'dropShadow', args: {dx: 0, dy: 0, blur: 1}});
    }
}