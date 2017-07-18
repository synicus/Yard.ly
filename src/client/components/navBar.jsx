import React from 'react'
import { Link } from 'react-router-dom'
import { Router } from 'react-router'


const NavBar = () =>
  (<nav className="navbar navbar-default">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
          <span className="icon-bar"></span>
        </button>
        <a className="navbar-brand" href="#">Yard.ly</a>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li className="active"><a href="#">Link <span className="sr-only">(current)</span></a></li>
          <li><a href="#">Link</a></li>
        </ul>
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#">Link</a></li>
          <li className="dropdown">
            <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Route test <span className="caret"></span></a>
            <ul className="dropdown-menu">
              <li><Link to="/">/</Link></li>
              <li><Link to="/workers">Workers</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li role="separator" className="divider"></li>
              <li><a href="#">Placeholder</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>)

export default NavBar;
