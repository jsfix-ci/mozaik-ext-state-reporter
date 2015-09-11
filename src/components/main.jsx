var React = require('react');

var Main = React.createClass({
     getInitialState() {
        return {
            states: [],
            overall:{
                state:''
            }
        };
    },
    render() {
        return (
            <div>
                <div className="widget__header">
                    <span>
                        State <span className="widget__header__subject">Reports</span>
                    </span>
                    <i className={`fa fa-eye state--${this.state.overall.stateName}`} />
                </div>
                <div className="widget__body">
                    <p>{this.state.overall.updated}</p>
                    <code>{JSON.stringify(this.state.states, true)}</code>
                </div>
            </div>
        );
    },
    componentWillUnmount() {
        clearInterval(this.interval);
    },
    componentDidMount() {
        this.interval = setInterval(this._tick, 4000);
        this._updateIcon(0);
    },
    _tick() {
        var sources = window.document.querySelectorAll('.widget[data-state]');
        var componentStates = [].map.call(sources, (source) => {
            return {
                name: source.className.split(' ')[1],
                state: Number(source.getAttribute('data-state'))
            };
        });
        var allStateCodes = componentStates.map((state)=>{return state.state});
        var overallState = Math.max.apply(null, allStateCodes);
        var mostImportantCount = componentStates.filter(c => {return c.state===overallState;}).length;
        this.setState({
            states: componentStates,
            overall:{
                stateName: ['ok', 'warning', 'error'][overallState],
                updated: new Date().toString()
            }
        });

        this._updateIcon(overallState);
        this._updateTitle(mostImportantCount, componentStates.length);
    },
    _updateTitle(mostImportantCount, reportersCount){
        this.orgTitle = this.orgTitle || window.document.title;
        window.document.title = `${this.orgTitle} (${mostImportantCount}/${reportersCount})`;
    },
    _updateIcon(state) {
        var link = document.createElement('link');
        link.id="stateicon";
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = [
            '/imgs/favicon-chain.ico',
            '/imgs/favicon-bolt.ico',
            '/imgs/favicon-bomb.ico'
            ]
            [state];
        if(document.getElementById('stateicon')){
            document.getElementById('stateicon').remove();
        }
        document.getElementsByTagName('head')[0].appendChild(link);
    }
});

module.exports = Main;