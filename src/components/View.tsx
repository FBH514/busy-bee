import {useEffect, useState} from "react";

function View() {

    const [data, setData] = useState([]);
    const [results, setResults] = useState(0);
    const [term, setTerm] = useState("");
    const api = "http://localhost:8000/v1/careers";

    useEffect(() => {
        if (data.length === 0) {
            fetch(api)
                .then(response => response.json())
                .then(data => {
                    setData(data)
                    setResults(data.length)
                })
        }
    }, [data]);

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

            function HandleSearch() {
                const search = document.getElementById("search-input") as HTMLInputElement;
                const searchValue = search.value;
                if (searchValue.length > 0) {
                    fetch("http://localhost:8000/v1/careers/search/" + searchValue)
                        .then(response => response.json())
                        .then(data => {
                            setData(data)
                            setResults(data.length)
                            if (data.length === 0) {
                                setTerm("No results found for " + searchValue)
                            }
                            else {
                                setTerm(searchValue)
                            }
                        });
                }
            }

            document.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    HandleSearch();
                }
            });

            return (
                <div id={"search"}>
                    <input
                        type={"text"}
                        placeholder={RandomPlaceholder()}
                        id={"search-input"}
                    />
                    <button
                        className={"header-buttons"}
                        id={"search-button"}
                        onClick={HandleSearch}
                    >Search</button>
                    <button
                        className={"header-buttons"}
                        id={"reset-button"}
                        onClick={() => {
                            fetch(api)
                                .then(response => response.json())
                                .then(data => {
                                    setData(data)
                                    setResults(data.length)
                                    setTerm("")
                                })
                        }}
                    >Reset</button>
                </div>
            );
        }

        return (
            <div id={"view-header"}>
                <div id={"view-header-wrapper"}>
                    <div id={"left-side"}>
                        {term !== "" ? <p>{results} Results for {term}</p> : <p>All {results} results</p>}
                    </div>
                    <div id={"right-side"}>
                        <Search/>
                    </div>
                </div>
            </div>
        );
    }

    function Table() {
        return (
            <table id={"view-table"}>
                <thead>
                <tr>
                    <th className={"applied"}>Applied</th>
                    <th className={"title"}>Title</th>
                    <th className={"location"}>Location</th>
                    <th className={"employer"}>Employer</th>
                    <th className={"description"}>Description</th>
                    <th className={"url"}>URL</th>
                </tr>
                </thead>
                <tbody>
                {data.length > 0 &&
                    data.map((item, index) => (
                        <tr key={index}>
                            <td className={"applied"}>{item["applied"]}</td>
                            <td className={"title"}>{item["title"]}</td>
                            <td className={"location"}>{item["location"]}</td>
                            <td className={"employer"}>{item["employer"]}</td>
                            <td className={"description"}>{item["description"]}</td>
                            <td className={"url"}>{item["url"]}</td>
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