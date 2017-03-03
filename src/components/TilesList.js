import React from 'react';
import Tile from './Tile';

export default class TilesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tiles: [
                {id: 'first', heading: 'First', content: 'First Tile Content'},
                {id: 'second', heading: 'Second', content: 'Second Tile Content'},
                {id: 'third', heading: 'Third', content: 'Third Tile Content'},
            ]
        };
    }

    render() {
        return (
            <div className="tilesList">
                {
                    this.state.tiles.map((item, index) => {
                        return <Tile item={item} getDomNode={this.props.getDomNode} key={index}/>
                    })
                }
            </div>
        );
    }
}
