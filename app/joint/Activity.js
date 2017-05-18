import Joint from "jointjs";

export default class Activity extends Joint.shapes.basic.Rect {
    constructor(props) {
        super(props);
        this.set('size', {
            width: (props.text.length * 10) > 80 ? props.text.length * 10 : 80,
            height: 40
        });
        this.attr('rect', {
            fill: {
                type: 'linearGradient',
                stops: [
                    {offset: '0%', color: '#64B5F6'},
                    {offset: '100%', color: '#2196F3'}
                ]
            }, 'stroke': '#1976D2', 'stroke-width': 1
        });
        this.attr('text', {text: props.text, fill: 'white', 'font-size': 13});
        this.attr('text/filter', {name: 'dropShadow', args: {dx: 0, dy: 0, blur: 1}});
        this.attr('rect/filter', {name: 'dropShadow', args: {dx: 0, dy: 0, blur: 1}});
    }
}