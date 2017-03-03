import React from 'react';

export default class TileContent extends React.Component {
    render() {
        return (
            <div className="tileContent">{ this.props.content }</div>
        );
    }
}
