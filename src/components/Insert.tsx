import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {CSSTransition} from "react-transition-group";

interface Career {
    id: number;
    applied: string;
    title: string;
    location: string;
    employer: string;
    description: string;
    url: string;
}

interface Location {
    name: string;
    value: number;
}

interface InputProps {
    name: string;
    type: string;
    placeholder: string;
}

interface Certification {
    elapsed: number;
    rounded: number;
}

function Insert(): JSX.Element {

    const YOUR_GRADUATION: string = "2022-12-14"
    const ENDPOINT: string = "http://localhost:8000/v1/careers/";
    const remote: string = "http://localhost:8000/v1/careers/remote";
    const locations: string = "http://localhost:8000/v1/careers/data/locations";

    function Header(): JSX.Element {

        async function getResults(): Promise<Career[] | undefined> {
            const response = await fetch(ENDPOINT);
            return await response.json();
        }

        async function getLocations(): Promise<Location> {
            const response = await fetch(locations);
            return await response.json();
        }

        async function getRemote(): Promise<number> {
            const response = await fetch(remote);
            return await response.json();
        }

        const CACHE = {cacheTime: 24 * 60 * 60 * 1000};
        const {isLoading: isLoadingCareers, data: dataResults} = useQuery('results', getResults, CACHE)
        const {isLoading: isLoadingLocations, data: dataLocations} = useQuery('locations', getLocations, CACHE);
        const {isLoading: isLoadingRemote, data: dataRemote} = useQuery('remote', getRemote, CACHE);

        if (isLoadingCareers || isLoadingLocations || isLoadingRemote) {
            return (
                <div id={"insert-header"}>
                    <div id={"insert-header-wrapper"}>
                        <h3 id={'loading'}>{"Loading..."}</h3>
                    </div>
                </div>
            );
        }

        function getCurrentDate(): string {
            const date = new Date();
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        }

        function completedCertification(gradDate: string): Certification {
            const date = new Date();
            const targetDate = new Date(gradDate);
            const timeElapsed = date.getTime() - targetDate.getTime();
            const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
            const roundedDaysElapsed = Number(daysElapsed.toFixed(2));
            return {elapsed: daysElapsed, rounded: roundedDaysElapsed};
        }

        const gradDate: Certification = completedCertification(YOUR_GRADUATION);
        const currentDate: string = getCurrentDate();

        function Insight(props: {title: string, img: {link: string, alt: string}}): JSX.Element {
            return (
                <div className="insight">
                    <img src={props.img.link} alt={props.img.alt}/>
                    <h2>{props.title}</h2>
                </div>
            );
        }

        const CALENDAR: string = "https://img.icons8.com/fluency-systems-regular/24/333333/tear-off-calendar.png";
        const MARKER: string = "https://img.icons8.com/ios/24/333333/place-marker--v1.png";
        const APPLICATIONS: string = "https://img.icons8.com/ios/24/333333/overview-pages-3.png";
        const GRADUATION: string = "https://img.icons8.com/pastel-glyph/24/333333/graduation-cap--v3.png";
        const RATIO: string = "https://img.icons8.com/external-outlines-amoghdesign/24/333333/external-analysis-education-vol-01-outlines-amoghdesign.png";
        const TROPICS: string = "https://img.icons8.com/ios/24/333333/tropics.png";

        return (
            <div id={"insert-header"}>
                <Insight title={currentDate} img={{link: CALENDAR, alt: "calendar"}}/>
                <Insight title={`Most Applied: ${dataLocations?.name}, ${dataLocations?.value}`} img={{link: MARKER, alt: "marker"}}/>
                <Insight title={`${dataResults?.length} applications`} img={{link: APPLICATIONS, alt: "applications"}}/>
                <Insight title={`${gradDate.rounded} days since graduation`} img={{link: GRADUATION, alt: "graduation"}}/>
                <Insight title={`${Number(dataResults && dataResults?.length / gradDate.elapsed).toFixed(2)} applications per day`} img={{link: RATIO, alt: "ratio"}}/>
                <Insight title={`${Number(dataRemote).toFixed(2)}% remote`} img={{link: TROPICS, alt: "tropics"}}/>
            </div>
        );
    }

    function Message(): JSX.Element {
        return (
            <div className={"message"}>
                <p id={"insert-message"}></p>
            </div>
        );
    }

    function changeMessage(message: string): void {
        const mess = document.getElementById("insert-message") as HTMLDivElement;
        mess!.innerHTML = message;
    }

    function activeMessage(bool = false): void {
        const message = document.getElementsByClassName("message")[0];
        if (!bool) message.classList.remove("active");
        else {
            message.classList.add("active");
            setTimeout(() => {
                message.classList.remove("active");
                changeMessage("");
            }, 2000);
        }
    }

    function InputFields(): JSX.Element {
        const [lock, setLock] = useState(true);
        const [inputValues, setInputValues] = useState({
            title: "",
            location: "",
            employer: "",
            description: "",
            url: ""
        });

        const input: InputProps[] = [
            {name: "title", type: "text", placeholder: "Title"},
            {name: "location", type: "text", placeholder: "Location"},
            {name: "employer", type: "text", placeholder: "Employer"},
            {name: "description", type: "text", placeholder: "Description"},
            {name: "url", type: "text", placeholder: "URL"}
        ];

        useEffect(() => {
            if (inputValues.title !== "" && inputValues.location !== "" && inputValues.employer !== "" && inputValues.description !== "" && inputValues.url !== "") {
                setLock(false);
            } else {
                setLock(true);
            }
        }, [inputValues]);

        function POSTData(data: any): void {
            fetch('http://localhost:8000/v1/careers/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(response => {
                return response.json()
            }).then(data => {
                if (data['status'] === 'Success!') resetInputValues();
            });
        }

        useEffect(() => {
            function HandleClick(e: any): void {
                if (e.key === "Enter") {
                    const submit = document.getElementById("insert-submit");
                    if (submit && !lock) submit.click();
                }
            }

            document.addEventListener('keydown', HandleClick);
            return () => document.removeEventListener('keydown', HandleClick); // clean up
        });

        function resetInputValues(): void {
            setInputValues({title: "", location: "", employer: "", description: "", url: ""});
        }

        function handleSubmit(values: any): void {
            POSTData(values);
            changeMessage("Successfully added a new career!");
            activeMessage(true);
        }

        function SubmitIcon(): JSX.Element {
            const locked = <img src="https://img.icons8.com/ios-glyphs/24/F6BD60/lock--v1.png" alt={"padlock"}/>;
            const unlocked = <img src="https://img.icons8.com/material/24/F6BD60/checkmark--v1.png" alt={"unlock"}/>
            return lock ? locked : unlocked;
        }

        function ResetButton(): JSX.Element {
            return (
                <button className="buttons" id={"insert-reset"} onClick={resetInputValues}>
                    <img src="https://img.icons8.com/ios/24/F6BD60/recurring-appointment.png" alt={"reset"}/>
                    Reset
                </button>
            );
        }

        return (
            <div id="insert-input-fields">
                <div id="insert-input-fields-wrapper">
                    {input?.map((input, index) => {
                        return (
                            <input
                                key={index}
                                className="input-field"
                                value={inputValues[input.name as keyof typeof inputValues]}
                                type={input.type}
                                name={input.name}
                                placeholder={input.placeholder}
                                onChange={(e) => setInputValues({...inputValues, [input.name]: e.target.value})}
                            />
                        )
                    })}
                </div>
                <div id={"insert-buttons"}>
                    <ResetButton/>
                    <button
                        className="buttons"
                        id={"insert-submit"}
                        type="submit"
                        disabled={lock}
                        onClick={() => handleSubmit(inputValues)}
                    >
                        <SubmitIcon/>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
            <div id="insert-content">
                <div id={"insert-content-wrapper"}>
                    <Message/>
                    <Header/>
                    <InputFields/>
                </div>
            </div>
        </CSSTransition>
    );
}

export default Insert;