import React from 'react';
import TileHeader from './TileHeader';
import TileContent from './TileContent';

export default class Tile extends React.Component {
    render() {
        let {item, getDomNode} = this.props;
        return (
            <div ref={getDomNode}  className="tile" id={item.id} onClick={() => { console.log(item.id)}}>
                <TileHeader heading={item.heading}/>
                <TileContent content={item.content}/>
            </div>
        )
    }
}
