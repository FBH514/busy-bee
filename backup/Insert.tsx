import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {CSSTransition} from "react-transition-group";

interface CareerProps {
    id: number;
    applied: string;
    title: string;
    location: string;
    employer: string;
    description: string;
    url: string;
}

interface LocationProps {
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

enum METHOD {
    POST = "POST"
}

// insight icons
const INSIGHT_ICON_COLOR: string = "F6BD60";
const INSIGHT_ICON_SIZE: string = "24";
const CALENDAR_ICON: string = `https://img.icons8.com/ios/${INSIGHT_ICON_SIZE}/${INSIGHT_ICON_COLOR}/clock--v1.png`;
const MARKER_ICON: string = `https://img.icons8.com/ios/${INSIGHT_ICON_SIZE}/${INSIGHT_ICON_COLOR}/place-marker--v1.png`;
const APPS_ICON: string = `https://img.icons8.com/ios/${INSIGHT_ICON_SIZE}/${INSIGHT_ICON_COLOR}/overview-pages-3.png`;
const GRAD_ICON: string = `https://img.icons8.com/pastel-glyph/${INSIGHT_ICON_SIZE}/${INSIGHT_ICON_COLOR}/graduation-cap--v3.png`;
const RATIO_ICON: string = `https://img.icons8.com/external-outlines-amoghdesign/${INSIGHT_ICON_SIZE}/${INSIGHT_ICON_COLOR}/external-analysis-education-vol-01-outlines-amoghdesign.png`;
const REMOTE_ICON: string = `https://img.icons8.com/ios/${INSIGHT_ICON_COLOR}/${INSIGHT_ICON_SIZE}/imac.png`;

// grad date
const YOUR_GRADUATION: string = "2022-12-14";

// endpoints
const CACHE = {cacheTime: 24 * 60 * 60 * 1000};
const CAREERS_ENDPOINT: string = "http://localhost:8000/v1/careers/";
const REMOTE_ENDPOINT: string = "http://localhost:8000/v1/careers/remote";
const LOCATIONS_ENDPOINT: string = "http://localhost:8000/v1/careers/data/locations";
const post_headers = {'Content-Type': 'application/json'}

const LOCKED = <img src="https://img.icons8.com/ios-glyphs/24/F6BD60/lock--v1.png" alt={"padlock"}/>;
const UNLOCKED = <img src="https://img.icons8.com/material/24/F6BD60/checkmark--v1.png" alt={"unlock"}/>
const RESET: string = "https://img.icons8.com/ios/24/F6BD60/recurring-appointment.png";
const MESSAGE_DELAY = 2000;

const input: InputProps[] = [
    {name: "title", type: "text", placeholder: "Title"},
    {name: "location", type: "text", placeholder: "Location"},
    {name: "employer", type: "text", placeholder: "Employer"},
    {name: "description", type: "text", placeholder: "Description"},
    {name: "url", type: "text", placeholder: "URL"}
];

export default function Insert(): JSX.Element {

    const [lock, setLock] = useState(true);
    const [inputValues, setInputValues] = useState({
        title: "",
        location: "",
        employer: "",
        description: "",
        url: ""
    });

    async function GET(endpoint: string): Promise<any> {
        const response = await fetch(endpoint);
        return await response.json();
    }

    function POSTData(data: any): void {
        fetch(CAREERS_ENDPOINT, {method: METHOD.POST, headers: post_headers, body: JSON.stringify(data)}
        ).then(response => {return response.json()}).then(data => {
            if (data['status'] === 'Success!') resetInputValues();
        });
    }

    useEffect(() => {
        if (inputValues.title && inputValues.location && inputValues.employer && inputValues.description && inputValues.url) {
            setLock(false);
        } else {
            setLock(true);
        }
    }, [inputValues]);

    useEffect(() => {
        function HandleClick(e: any): void {
            if (e.key === "Enter") {
                const submit = document.getElementById("insert-submit");
                if (submit && !lock) submit.click();
            }
        }
        document.addEventListener('keydown', HandleClick);
        return () => document.removeEventListener('keydown', HandleClick); // clean up
    }, [lock]);

    const {
        isLoading: isLoadingCareers,
        data: dataResults
    } = useQuery<CareerProps[]>('results', () => GET(CAREERS_ENDPOINT), CACHE)
    const {
        isLoading: isLoadingLocations,
        data: dataLocations
    } = useQuery<LocationProps>('locations', () => GET(LOCATIONS_ENDPOINT), CACHE);
    const {
        isLoading: isLoadingRemote,
        data: dataRemote
    } = useQuery<number>('remote', () => GET(REMOTE_ENDPOINT), CACHE);

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

    function resetInputValues(): void {
        setInputValues({title: "", location: "", employer: "", description: "", url: ""});
    }

    function handleSubmit(values: any): void {
        POSTData(values);
        changeMessage("Successfully added a new career!");
        activeMessage(true);
    }

    function handleInput(e: any): void {
        const {name, value} = e.target;
        setInputValues({...inputValues, [name]: value});
    }

    function Header(): JSX.Element {

        if (isLoadingCareers || isLoadingLocations || isLoadingRemote) {
            return (
                <div id={"insert-header"}>
                    <div id={"insert-header-wrapper"}>
                        <h3 id={'loading'}>{"Loading..."}</h3>
                    </div>
                </div>
            );
        }

        const gradDate: Certification = completedCertification(YOUR_GRADUATION);
        const currentDate: string = getCurrentDate();

        function Insight(props: { title: string, img: { link: string, alt: string } }): JSX.Element {
            return (
                <div className="insight">
                    <img src={props.img.link} alt={props.img.alt}/>
                    <h2>{props.title}</h2>
                </div>
            );
        }

        return (
            <div id={"insert-header"}>
                <Insight title={currentDate} img={{link: CALENDAR_ICON, alt: "calendar"}}/>
                <Insight title={`Most Applied: ${dataLocations?.name}, ${dataLocations?.value}`}
                         img={{link: MARKER_ICON, alt: "marker"}}/>
                <Insight title={`${dataResults?.length} applications`} img={{link: APPS_ICON, alt: "applications"}}/>
                <Insight title={`${gradDate.rounded} days since graduation`}
                         img={{link: GRAD_ICON, alt: "graduation"}}/>
                <Insight
                    title={`${Number(dataResults && dataResults?.length / gradDate.elapsed).toFixed(2)} applications per day`}
                    img={{link: RATIO_ICON, alt: "ratio"}}/>
                <Insight title={`${Number(dataRemote).toFixed(2)}% remote`} img={{link: REMOTE_ICON, alt: "REMOTE"}}/>
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
            }, MESSAGE_DELAY);
        }
    }

    function InputFields(): JSX.Element {

        function SubmitIcon(): JSX.Element {
            return lock ? LOCKED : UNLOCKED;
        }

        function ResetButton(): JSX.Element {
            return (
                <button className="buttons" id={"insert-reset"} onClick={resetInputValues}>
                    <img src={RESET} alt={"reset"}/>
                    {"Reset"}
                </button>
            );
        }

        return (
            <div id="insert-input-fields">
                {input?.map((input) => {
                    return (
                        <input
                            key={input.name}
                            className="input-field"
                            value={inputValues[input.name as keyof typeof inputValues]}
                            type={input.type}
                            name={input.name}
                            placeholder={input.placeholder}
                            onInput={handleInput}
                        />
                    )
                })}
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