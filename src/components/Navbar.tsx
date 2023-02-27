import React from "react";
import {Link, useLocation} from "react-router-dom";

function Navbar() {

    const location = useLocation();

    function List() {

        const items = [
            {name: 'Insert', link: '/'},
            {name: 'View', link: '/view'}
            // {name: 'Update', link: '/update'},
            // {name: 'Delete', link: '/delete'},
        ];

        return (
            <ul id={"navbar-ul"}>
                {items.map((item, index) => {
                    return (
                        <li key={index}>
                            <Link
                                className={location.pathname === item.link ? "nav-item-active" : "nav-item"}
                                to={item.link}
                            >{item.name}
                            </Link>
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