import Joint from "jointjs";

export default class Link extends Joint.dia.Link {
    constructor(props) {
        super(props);
        this.set('labels',
            [{
                position: 0.5, attrs: {
                    text: {
                        text: props.label,
                        'font-size': 13,
                        'font-family': 'Roboto',
                        'font-weight': 'bold',
                        'fill': '#263238'
                    }, rect: {fill: '#FAFAFA'}
                }
            }]
        );
        this.attr('.connection', {stroke: '#263238', 'stroke-width': 1.5});
        this.attr('.marker-target', {stroke: '#263238', fill: '#263238', d: 'M 10 0 L 0 5 L 10 10 z'});
        this.attr('.link-tools/display', 'none');
        this.attr('.connection-wrap/display', 'none');
        this.attr('.marker-arrowheads/display', 'none');
        this.attr('.marker-vertices/display', 'none');
    }
}