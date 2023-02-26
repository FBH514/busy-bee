import {useState} from "react";

function View() {

    const [data, setData] = useState([]);
    const api = "http://localhost:8000/v1/careers";

    // function GETData() {
    //     fetch(api)
    //         .then((response) => {
    //             return response.json()
    //         })
    //         .then((data) => {
    //             setData(data['careers']);
    //         })
    // }

    // window.onload = GETData;

    function Header() {

        function RandomPlaceholder() {
            const placeholders = [
                "Search for title",
                "Search for location",
                "Search for employer",
            ]
            return placeholders[Math.floor(Math.random() * placeholders.length)];
        }

        function Search() {
            return (
                <div id={"search"}>
                    <input type={"text"} placeholder={RandomPlaceholder()}/>
                    <button>Search</button>
                </div>
            );
        }

        function Filters() {

            function HideOrShow() {
                const filterList = document.querySelector(".filters-ul");
                const active = "filters-ul-active";
                if (filterList!.classList.contains(active)) {
                    filterList!.classList.remove(active);
                } else {
                    filterList!.classList.add(active);
                }
            }

            function List() {
                const filters = ["Title", "Location", "Employer"]
                return (
                    <ul id={"filters-ul"} className={"filters-ul"}>
                        {filters.map((filter, index) => {
                            return (
                                <li key={index}>
                                    <button>{filter}</button>
                                </li>
                            );
                        })}
                    </ul>
                );
            }

            return (
                <div id={"filters"}>
                    <button onClick={HideOrShow}>
                        <img src="https://img.icons8.com/ios-filled/24/333333/sorting-options.png" alt={"filters"}/>
                    </button>
                    <List/>
                </div>
            );
        }

        return (
            <div id={"view-header"}>
                <div id={"view-header-wrapper"}>
                    <Search/>
                    <Filters/>
                </div>
            </div>
        );
    }

    function Table() {

        return (
            <table id={"view-table"}>
                <tbody>
                {data.map((item: any) => (
                    <tr key={item[0]}>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>{item[4]}</td>
                        <td>{item[5]}</td>
                        <td>{item[6]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }

    return (
        <div id={"view-content"}>
            <div id={"view-content-wrapper"}>
                <Header/>
                <Table/>
            </div>
        </div>
    );
}

export default View;