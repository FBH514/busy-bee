import {useEffect, useState} from "react";

function View() {

    const [data, setData] = useState([]);
    const api = "http://localhost:8000/v1/careers";

    // make a hook with the api call above
    useEffect(() => {
        if (data.length === 0) {
            fetch(api)
                .then(response => response.json())
                .then(data => setData(data))
        }
    }, []);

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
                <thead>
                <tr>
                    <th id={"applied"}>Applied</th>
                    <th id={"title"}>Title</th>
                    <th id={"location"}>Location</th>
                    <th id={"employer"}>Employer</th>
                    <th id={"description"}>Description</th>
                    <th id={"url"}>URL</th>
                </tr>
                </thead>
                <tbody>
                {data.length > 0 &&
                    data.map((item, index) => (
                        <tr key={index}>
                            <td>{item["applied"]}</td>
                            <td>{item["title"]}</td>
                            <td>{item["location"]}</td>
                            <td>{item["employer"]}</td>
                            <td>{item["description"]}</td>
                            <td>{item["url"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
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