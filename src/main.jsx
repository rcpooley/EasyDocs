import React from 'react';
import Sidebar from './sidebar';
import Viewer from "./viewer";

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            obj: null
        };
    }

    onSelect(obj) {
        this.setState({obj});
    }

    render() {
        return (
            <div id="main">
                <Sidebar
                    onSelect={obj => this.onSelect(obj)}
                    pages={this.props.pages}
                />
                <Viewer obj={this.state.obj}/>
            </div>
        );
    }
}

export default Main;
