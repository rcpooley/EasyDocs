import React from 'react';

import Collapsed from '../res/collapsed.png';
import Expanded from '../res/expanded.png';

const INDENT_PX = 20;

class Sublist extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: props.list,
            indent: props.indent,
            expanded: Array.apply(null, new Array(props.list.length)).map(() => true)
        };
    }

    toggleSublist(idx) {
        const expanded = this.state.expanded.slice();
        expanded[idx] = !expanded[idx];
        this.setState({expanded});
    }

    selectSection(idx) {
        const obj = this.state.list[idx];
        if (obj.sec && (!this.state.expanded[idx] || this.props.selected === obj.id)) {
            this.toggleSublist(idx);
        }
        this.props.onSelect(obj.id);
    }

    buildListItem(obj, idx) {
        const expanded = this.state.expanded[idx];
        return (
            <div key={obj.name}>
                <div className={`textWrapper${obj.id === this.props.selected ? ' selected' : ''}`} style={{paddingLeft: INDENT_PX * (this.state.indent + 1)}}>
                    {obj.sec && <img src={expanded ? Expanded : Collapsed} onClick={() => this.toggleSublist(idx)}/>}
                    <div className="textContent noselect" onClick={() => this.selectSection(idx)}>{obj.name}</div>
                </div>
                {obj.sec && expanded && (
                    <Sublist
                        list={obj.sec}
                        indent={this.state.indent + 1}
                        selected={this.props.selected}
                        onSelect={id => this.props.onSelect(id)}
                    />
                )}
            </div>
        );
    }

    render() {
        return (
            <div className="sublist">
                {this.state.list.map((obj, idx) => this.buildListItem(obj, idx))}
            </div>
        );
    }
}

export default Sublist;
