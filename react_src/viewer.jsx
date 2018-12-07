import React from 'react';

class Viewer extends React.Component {
    parseObject() {
        const obj = this.props.obj;
        if (obj === null) {
            return <div>Loading...</div>;
        } else if (obj.comp) {
            return React.createElement(this.props.obj.comp, {});
        } else {
            return (
                <div>
                    <h1>{obj.name}</h1>
                    {obj.sec.map(o => <div>{o.name}</div>)}
                </div>
            );
        }
    }

    render() {
        return (
            <div id="viewer">
                {this.parseObject()}
            </div>
        );
    }
}

export default Viewer;
