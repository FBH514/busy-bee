import React, {useEffect} from "react";
import {Link, useLocation} from "react-router-dom";
import {useNavigate} from "react-router-dom";

export interface NavItemProps {
    name: string;
    link: string;
}

const ICON_COLOR = "333333";
const LOGO_ICON: string = `https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/48/${ICON_COLOR}/external-bee-nature-resource-vitaliy-gorbachev-fill-vitaly-gorbachev.png`;
const BURGER_ICON: string = `https://img.icons8.com/external-anggara-basic-outline-anggara-putra/32/${ICON_COLOR}/external-option-social-media-interface-anggara-basic-outline-anggara-putra-2.png`;

function Navbar(props: {items: NavItemProps[]}): JSX.Element {

    const location = useLocation();
    const navigate = useNavigate();
    const items = props.items;

    useEffect(() => {
        function handler(e: KeyboardEvent) {
            if (e.key === '1') navigate(items[0].link);
            if (e.key === '2') navigate(items[1].link);
            if (e.key === '3') navigate(items[2].link);
        }
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    });

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 992) handleMobileMenu();
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
        if (window.innerWidth < 992) handleMobileMenu();
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

    function Logo(): JSX.Element {

        function Button(): JSX.Element {
            return (
                <button id={"mobile-menu"} className={"mobile-menu"} onClick={handleMobileMenu}>
                    <img src={BURGER_ICON} alt={"hamburger-menu"}/>
                </button>
            );
        }

        return (
            <div id={"navbar-logo"}>
                <div id={"navbar-logo-wrapper"}>
                    <Button/>
                    <Link to={"/"}>Busy Bee</Link>
                    <img src={LOGO_ICON} alt="bee"/>
                </div>
            </div>
        );
    }

    return (
        <nav id={"navbar"}>
            <div id={"navbar-wrapper"}>
                <List arr={items}/>
                <Logo/>
            </div>
        </nav>
    );
}

export default Navbar;