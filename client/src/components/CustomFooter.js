import React from "react";

import './CustomFooter.css';

class CustomFooter extends React.Component{

    render() {
        return (
            <div className={"custom-footer"}>
                <p className={"custom-footer-content"}>Credits: Brian Pulfer, Michael Mazourik</p>
            </div>
        )
    }
}

export default CustomFooter;