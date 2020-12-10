import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Navbar, NavbarBrand} from "react-bootstrap";

import {HOME_ROUTE, ABOUT_ROUTE} from '../../utils/Routes';

import "./CustomNavbar.css"

class CustomNavbar extends Component{

    render() {
        return (
            <Navbar className={"custom-navbar"} sticky={'top'}>
                <NavbarBrand>Second-hand Marketplace</NavbarBrand>
                <Navbar.Collapse className={"justify-content-end"}>
                    <Link to={'/'}>Home</Link>
                    <Link to={ABOUT_ROUTE}>About</Link>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default CustomNavbar;