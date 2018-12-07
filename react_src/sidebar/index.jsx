import React from 'react';
import Sublist from './sublist';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        const objMap = {};
        const pages = this.props.pages;
        this.buildIDs(pages, 0, objMap);
        this.state = {
            pages,
            selected: 0,
            objMap
        };
        this.onSelect(0);
    }

    buildIDs(arr, curID, map) {
        arr.forEach(obj => {
            obj.id = curID++;
            map[obj.id] = obj;
            if (obj.sec)
                curID = this.buildIDs(obj.sec, curID, map);
        });
        return curID;
    }

    onSelect(id) {
        this.setState({selected: id});
        this.props.onSelect(this.state.objMap[id]);
    }

    render() {
        return (
            <div id="sidebar">
                <Sublist
                    list={this.state.pages}
                    indent={0}
                    selected={this.state.selected}
                    onSelect={id => this.onSelect(id)}
                />
            </div>
        );
    }
}

export default Sidebar;
