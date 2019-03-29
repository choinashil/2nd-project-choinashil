import React, { Component } from 'react';
import './Header.scss';

class Header extends Component {
  _onMenuButtonClick() {
    const { showMenuTab } = this.props;
    showMenuTab();
  }

  render() {
    const { menuTabOpened } = this.props.display;
    return (
      <header className="Header" onClick={this._onMenuButtonClick.bind(this)}>
        <img src="https://pngimg.com/uploads/nike/nike_PNG7.png" alt="logo" className="Header-logo"></img>
        <i className={menuTabOpened ? "fas fa-angle-down spin-up" : "fas fa-angle-down spin-down"} />
      </header>
    );
  }
}

export default Header;
