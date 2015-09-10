var React            = require('react');

var Main = React.createClass({
     getInitialState() {
        return {
            states: []
        };
    },

    render() {
        return (
            <span>Wuahhha! <br/><code>{JSON.stringify(this.props.states, true)}</code></span>
        );
    },
    componentDidUpdate(){

    	function updateIcon(state){
    		var link = document.createElement('link');
    		link.id="stateicon";
		    link.type = 'image/x-icon';
		    link.rel = 'shortcut icon';
		    link.href = [
		    	'http://www.favicon-generator.org/favicon-generator/htdocs/favicons/2015-09-10/6bb4ebe3a9a4bc3d1226c1dd2fd2af67.ico',
		    	'http://www.favicon-generator.org/favicon-generator/htdocs/favicons/2015-09-10/95e52c9b83a04d026c89c5c515e6a2be.ico',
		    	'http://www.favicon-generator.org/favicon-generator/htdocs/favicons/2015-09-10/e96b991c2b4394d230697ffa09600ad7.ico']
		    	[state];
		    if(document.getElementById('stateicon')){
		    	document.getElementById('stateicon').remove();
		    }
		    document.getElementsByTagName('head')[0].appendChild(link);
    	}

    	var sources = window.document.querySelectorAll('.widget[data-state]');
    	var componentStates = [].map.call(sources, (source) => {
    		return {
    			name: source.className.split(' ')[1],
    			state: Number(source.getAttribute('data-state'))
    		};
    	});
// TODO, does not work, should be able to do all the stuff from this function earlier, before render is called, not after.
        this.props = {
            states: componentStates
        };

    	console.log('reporters:', componentStates);

    	updateIcon(Math.max.apply(null, componentStates.map((state)=>{return state.state})));
    }
});

module.exports = Main;