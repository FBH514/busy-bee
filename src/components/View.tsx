import {useEffect, useRef, useState} from "react";
import {CSSTransition} from "react-transition-group";
import {useQuery} from 'react-query';

interface DataProps {
    id: number;
    applied: string;
    title: string;
    location: string;
    employer: string;
    description: string;
    url: string;
}

function View(): JSX.Element {

    const [dataResults, setDataResults] = useState<DataProps[]>([]);
    const [active, setActive] = useState<boolean>(false);
    const searchInput = useRef<HTMLInputElement>(null);
    const ENDPOINT: string = "http://localhost:8000/v1/careers";
    const search: string = "http://localhost:8000/v1/careers/search/"

    async function fetchData(): Promise<DataProps[] | void> {
        const response = await fetch(ENDPOINT);
        const data = await response.json();
        setDataResults(data);
    }

    const {} = useQuery('results', fetchData);

    useEffect(() => {
        const input = searchInput.current;
        if (!input) return;

        async function handler(): Promise<DataProps[] | void> {
            const value = (input as HTMLInputElement)?.value;
            if (value.length < 2) {
                await fetchData().then();
            }
            else if (value.length > 1) {
                const response = await fetch(search + value);
                const data = await response.json();
                await setDataResults(data);
            }
        }

        input.addEventListener("input", handler);

        // Clean up
        return () => input.removeEventListener("input", handler);
    }, [active]);


    const placeholders: string[] = [
        "Search for a life changing opportunity [...]",
        "Search for a career that will make you fulfilled [...]",
        "Search for a career that will make you wealthy [...]",
        "Search for a career that will make you happy [...]",
        "Search for a career that will make you proud [...]",
        "Search for a career that will make you successful [...]",
    ]

    const [placeholder, setPlaceholder] = useState<string>(placeholders[0]);
    const PLACEHOLDER_DELAY: number = 1000 * 3

    function randomPlaceholder(): void {
        setPlaceholder(placeholders[Math.floor(Math.random() * placeholders.length)]);
    }

    useEffect(() => {
        const changePlaceholder: any = setInterval(() => {
            randomPlaceholder();
        }, PLACEHOLDER_DELAY)

        // clean up
        return () => clearInterval(changePlaceholder);
    })

    function handleCopy(item: DataProps, index: number): void {
        navigator.clipboard.writeText(item["url"]);
        const img = document.getElementById("copy" + index) as HTMLImageElement;
        img.src = "https://img.icons8.com/material/16/333333/checkmark--v1.png"
    }

    const APPOINTMENT_IMG: string = "https://img.icons8.com/ios/24/F6BD60/recurring-appointment.png";

    return (
        <CSSTransition in={true} appear={true} timeout={500} classNames="fade">
            <div id={"view-content"}>
                <div id={"view-content-wrapper"}>
                    <div id={"view-header"}>
                        <div id={"view-header-wrapper"}>
                            <input
                                type={"text"}
                                placeholder={placeholder}
                                id={"search-input"}
                                ref={searchInput}
                            />
                            <p>{dataResults.length} results</p>
                            <button className={"header-buttons"} id={"reset-button"} onClick={fetchData}>
                                <img src={APPOINTMENT_IMG} alt={"reset"}/>{"Reset"}
                            </button>
                        </div>
                    </div>
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
                        {dataResults?.map((item: DataProps, index: number) => (
                            <tr key={index}>
                                <td className={"applied"}>{item["applied"]}</td>
                                <td className={"title"}>{item["title"]}</td>
                                <td className={"location"}>{item["location"]}</td>
                                <td className={"employer"}>{item["employer"]}</td>
                                <td className={"description"}>{item["description"]}</td>
                                <td className={"url"}>
                                    <img id={"copy" + index} src="https://img.icons8.com/material-rounded/16/333333/copy.png" alt={"copy"}
                                        onClick={() => handleCopy(item, index)}
                                    />
                                    {item["url"]}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </CSSTransition>
    );
}

export default View;