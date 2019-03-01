import React, { Component } from 'react';
import './Tiles.css';

export class Tiles extends Component {    
    constructor(props) {
        super(props);
      }
  
      render(){
        var tiles  = Array.isArray(this.props.data) ? this.props.data : [];
        
        return (
    <div className="GroupedTiles">
      <div>
        <div className="GroupedTiles-tiles-container">
          { tiles.map((tile, tileIndex) => {
            return <div key={tileIndex} className="GroupedTiles-tile">
                    <div className="GroupedTiles-tile-image-wrap">
                      <img className="GroupedTiles-tile-image" src={"https://s3.amazonaws.com/rentalfriend2/infographic-1/" + tile.imageName}/>
                      <div className="GroupedTiles-tile-actions">
                         <div className="GroupedTiles-tile-share-fb" title="Share on Facebook" onClick={() => this.props.share(tile)}></div>
                         <div className="GroupedTiles-tile-edit" title="Details" onClick={() => this.props.edit(tile)}></div>
                      </div>
                    </div>
                    {/* <div className="GroupedTiles-tile-details">
                        <div className="GroupedTiles-tile-name">{tile.userId}</div>
                        <div className="GroupedTiles-tile-description">{tile.details}</div>
                    </div> */}
                </div>;
            })
          }
        </div>
      </div>
    </div>); 
    }
};

export default Tiles;
