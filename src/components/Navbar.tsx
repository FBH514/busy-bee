import React from "react";
import {Link} from "react-router-dom";

function Navbar() {

    function List() {

        const items = [
            {name: 'Insert', link: '/'},
            {name: 'View', link: '/view'},
            {name: 'Update', link: '/update'},
            {name: 'Delete', link: '/delete'},
        ];

        return (
            <ul id={"navbar-ul"}>
                {items.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link to={item.link}>{item.name}</Link>
                        </li>
                    );
                })}
            </ul>
        )
    }

    function Logo() {
        return(
            <div id={"navbar-logo"}>
                <h1>Career Tracker</h1>
            </div>
        );
    }

    return (
        <nav id={"navbar"}>
            <div id={"navbar-wrapper"}>
                <List/>
                <Logo/>
            </div>
        </nav>
    );
}

export default Navbar;