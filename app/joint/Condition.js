import Joint from "jointjs";

export default class Condition extends Joint.shapes.erd.Relationship {
    constructor(props) {
        super(props);
        this.set('size', {
            width: (props.text.length * 10) > 70 ? props.text.length * 10 : 70,
            height: (props.text.length * 10) > 70 ? props.text.length * 10 : 70,
        });
        this.attr('.outer', {
            fill: {
                type: 'linearGradient',
                stops: [
                    {offset: '0%', color: '#00ACC1'},
                    {offset: '100%', color: '#0097A7'}
                ]
            }, 'stroke': '#00838F', 'stroke-width': 1
        });
        this.attr('text', {text: props.text, fill: 'white', 'font-size': 13});
        this.attr('text/filter', {name: 'dropShadow', args: {dx: 0, dy: 0, blur: 1}});
        this.attr('.outer/filter', {name: 'dropShadow', args: {dx: 0, dy: 0, blur: 1}});
    }
}