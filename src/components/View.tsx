import {useEffect, useState} from "react";
import {useQuery} from 'react-query';
import {CSSTransition} from "react-transition-group";

function View() {

    const [dataResults, setDataResults] = useState([]);
    const api = "http://localhost:8000/v1/careers";
    const endpoint = "http://localhost:8000/v1/careers/search/"

    async function fetchData() {
        const response = await fetch(api);
        const data = await response.json();
        setDataResults(data);
    }

    useEffect(() => {
        fetchData().then(() => console.log("Data fetched"));
    }, [])

    let {isLoading} = useQuery('results', () => {
    }, {
        enabled: false,
        refetchOnWindowFocus: false,
        cacheTime: 24 * 60 * 60 * 1000,
        onSuccess: () => setDataResults(dataResults)
    });

    async function FetchSearch(searchValue: string, endpoint: string) {
        if (searchValue.length > 0) {
            const response = await fetch(endpoint);
            const searchData = await response.json();
            setDataResults(searchData); // set state of dataResults with the result of the search
        }
    }

    function Header() {

        const placeholders = [
            "Search for a life changing opportunity [...]",
            "Search for a career that will make you fulfilled [...]",
            "Search for a career that will make you wealthy [...]",
            "Search for a career that will make you happy [...]",
            "Search for a career that will make you proud [...]",
            "Search for a career that will make you successful [...]",
        ]
        const [placeholder, setPlaceholder] = useState(placeholders[0]);
        const PLACEHOLDER_DELAY = 1000 * 2

        function randomPlaceholder() {
            return placeholders[Math.floor(Math.random() * placeholders.length)];
        }

        useEffect(() => {
            setInterval(() => setPlaceholder(randomPlaceholder), PLACEHOLDER_DELAY)
        })

        function Search() {

            function handleSearch() {
                const search = document.getElementById("search-input") as HTMLInputElement;
                const searchValue = search.value;
                FetchSearch(searchValue, endpoint + searchValue).then(() => console.log("Search fetched"));
            }

            document.addEventListener("keydown", function (event) {
                if (event.key === "Enter") handleSearch();
            });

            return (
                <div id={"search"}>
                    <input
                        type={"text"}
                        placeholder={placeholder}
                        id={"search-input"}
                    />
                    <button
                        className={"header-buttons"}
                        id={"search-button"}
                        onClick={handleSearch}
                    >
                        Search
                        <img src="https://img.icons8.com/ios-glyphs/24/363946/search--v1.png" alt={"search"}/>
                    </button>
                    <button
                        className={"header-buttons"}
                        id={"reset-button"}
                        onClick={fetchData}
                    >
                        Reset
                        <img src="https://img.icons8.com/ios/24/363946/recurring-appointment.png" alt={"reset"}/>
                    </button>
                </div>
            );
        }

        function Loading() {
            return (
                <div id="view-header">
                    <div id="view-header-wrapper">
                        <div id={"left-side"}>
                            <h3 id={"loading"}>{"Loading..."}</h3>
                        </div>
                        <div id={"right-side"}>
                            <Search/>
                        </div>
                    </div>
                </div>
            )
        }

        function Loaded() {
            return <p>{dataResults.length} results</p>;
        }

        return (
            <div id={"view-header"}>
                <div id={"view-header-wrapper"}>
                    <div id={"left-side"}>
                        {isLoading ? <Loading/> : <Loaded/>}
                    </div>
                    <div id={"right-side"}>
                        <Search/>
                    </div>
                </div>
            </div>
        );
    }

    function Table() {

        function THead() {
            return (
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
            );
        }

        function TBody() {
            return (
                <tbody>
                {dataResults.map((item: any, index: number) => (
                    <tr key={index}>
                        <td className={"applied"}>{item["applied"]}</td>
                        <td className={"title"}>{item["title"]}</td>
                        <td className={"location"}>{item["location"]}</td>
                        <td className={"employer"}>{item["employer"]}</td>
                        <td className={"description"}>{item["description"]}</td>
                        <td className={"url"}>
                            <img
                                id={"copy" + index}
                                src="https://img.icons8.com/material-rounded/16/DCDFF0/copy.png"
                                alt={"copy"}
                                onClick={() => {
                                    navigator.clipboard.writeText(item["url"]);
                                    const img = document.getElementById("copy" + index) as HTMLImageElement;
                                    img.src = "https://img.icons8.com/material/16/DCDFF0/checkmark--v1.png"
                                }}
                            />
                            {item["url"]}
                        </td>
                    </tr>
                ))}
                </tbody>
            );
        }

        return (
            <table id={"view-table"}>
                <THead/>
                <TBody/>
            </table>
        );
    }

    return (
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
            <div id={"view-content"}>
                <div id={"view-content-wrapper"}>
                    <Header/>
                    {isLoading ? <h3>{"Loading..."}</h3> : <Table/>}
                </div>
            </div>
        </CSSTransition>
    );
}

export default View;