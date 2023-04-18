import React from "react";
import {Link, useLocation} from "react-router-dom";

interface NavItemProps {
    name: string;
    link: string;
}

function Navbar(): JSX.Element {

    const location: any = useLocation();

    function HandleMobileMenu(): void {
        const active: string = "navbar-list-active";
        const button = document.querySelector(".navbar-list") as HTMLUListElement;
        if (button!.classList.contains(active)) {
            button!.classList.remove(active);
        }
        else {
            button!.classList.add(active);
        }
    }

    const items: NavItemProps[] = [
        {name: 'Insert', link: '/'},
        {name: 'View', link: '/view'},
        {name: 'Resources', link: '/resources'}
    ];

    function List(props: {arr: NavItemProps[]}): JSX.Element {

        function handleClick(): void {
            if (window.innerWidth < 992) HandleMobileMenu();
        }

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

        const LOGO_IMG: string = "https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/48/333333/external-bee-nature-resource-vitaliy-gorbachev-fill-vitaly-gorbachev.png";
        const BURGER: string = "https://img.icons8.com/external-anggara-basic-outline-anggara-putra/32/333333/external-option-social-media-interface-anggara-basic-outline-anggara-putra-2.png";

         function Button(): JSX.Element {
            return (
                <button id={"mobile-menu"} className={"mobile-menu"} onClick={HandleMobileMenu}>
                    <img src={BURGER} alt={"hamburger-menu"}/>
                </button>
            );
        }

        return(
            <div id={"navbar-logo"}>
                <div id={"navbar-logo-wrapper"}>
                    <Button/>
                    <Link to={"/"}>Busy Bee</Link>
                    <img src={LOGO_IMG} alt="bee"/>
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