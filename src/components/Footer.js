import React, { Component } from 'react';
import './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <footer className="Footer">
        <img src={require('../lib/logo.png')} alt="logo" />
        <div>Copyright © 2019 RunMate, inc.</div>
      </footer>
    );
  }
}

export default Footer;
