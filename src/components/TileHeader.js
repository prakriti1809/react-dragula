import React from 'react';

export default class TileHeader extends React.Component {
    render() {
        return (
            <div className="tileHeader">{ this.props.heading }</div>
        );
    }
}
