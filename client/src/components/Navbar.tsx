import React, {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import Button from "./Button";

export interface NavItemProps {
    name: string;
    link: string;
}

enum icons {
    LOGO_ICON = `https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/48/18181b/external-bee-nature-resource-vitaliy-gorbachev-fill-vitaly-gorbachev.png`,
    BURGER_ICON = `https://img.icons8.com/external-anggara-basic-outline-anggara-putra/32/18181b/external-option-social-media-interface-anggara-basic-outline-anggara-putra-2.png`
}

const BREAKPOINT: number = 992;
function Navbar(props: {items: NavItemProps[]}): JSX.Element {

    const location = useLocation();
    const items = props.items;

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < BREAKPOINT) handleMobileMenu();
        }
        document.addEventListener("resize", handleResize);
        return () => document.removeEventListener("resize", handleResize);
    });

    function handleMobileMenu(): void {
        const active: string = "navbar-list-active";
        const button = document.querySelector(".navbar-list") as HTMLUListElement;
        if (button!.classList.contains(active)) {
            button!.classList.remove(active);
        } else {
            button!.classList.add(active);
        }
    }

    function handleClick(): void {
        if (window.innerWidth < BREAKPOINT) handleMobileMenu();
    }

    function List(props: { arr: NavItemProps[] }): JSX.Element {

        return (
            <div id="navbar-list">
                <ul id={"navbar-list-wrapper"} className={"navbar-list"}>
                    {props.arr.map((item, index) => {
                        return (
                            <li key={index} onClick={handleClick}>
                                <Link
                                    className={location.pathname === item.link ? "nav-item-active" : "nav-item"}
                                    to={item.link}
                                >{item.name}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>
        )
    }

    return (
        <nav id={"navbar"}>
            <div id={"navbar-wrapper"}>
                <List arr={items}/>
                <div id={"navbar-logo"}>
                    <div id={"navbar-logo-wrapper"}>
                        <Button id={"mobile-menu"} className={"mobile-menu"} params={{onClick: handleMobileMenu, icon: icons.BURGER_ICON}}/>
                        <Link to={"/"}>Busy Bee</Link>
                        <img src={icons.LOGO_ICON} alt="bee"/>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;