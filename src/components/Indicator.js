import React, { Component } from 'react';
import { SyncLoader } from 'react-spinners';
import './Indicator.scss';

class Indicator extends Component {
  render() {
    return (
      <div className="Indicator">
        <SyncLoader
          sizeUnit={"px"}
          size={9}
          margin={"2px"}
          color={"orange"}
        />
      </div>
    )
  }
}

export default Indicator;
