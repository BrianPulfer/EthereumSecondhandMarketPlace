import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Navbar} from "react-bootstrap";

import {HOME_ROUTE, ABOUT_ROUTE} from './../utils/Routes';

class CustomNavbar extends Component{

    render() {
        return (
            <Navbar>
                <Link to={'/'}>Home</Link>
                <Link to={ABOUT_ROUTE}>About</Link>
            </Navbar>
        )
    }
}

export default CustomNavbar;