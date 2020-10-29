import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaAlignRight } from "react-icons/fa";

import logo from "../images/logo.png";

class Navbar extends Component {
  state = {
    isOpen: false,
  };

  handleToggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    return (
      <nav className="navbar">
        <div className="nav-center">
          <div className="nav-header">
            <Link to="/">
              <img src={logo} className="logo" alt="logo" />
            </Link>
            <button
              className="nav-btn"
              type="button"
              onClick={this.handleToggle}
            >
              <FaAlignRight className="nav-icon" />
            </button>
          </div>
          <ul
            className={this.state.isOpen ? "nav-links show-nav" : "nav-links"}
          >
            <li>
              <NavLink exact to="/">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/rooms">Rooms</NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
