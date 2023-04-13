import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {CSSTransition} from "react-transition-group";

function Insert() {

    const api = "http://localhost:8000/v1/careers/";
    const locations = "http://localhost:8000/v1/careers/data/locations";

    function Header() {

        async function FetchResults() {
            const response = await fetch(api);
            return await response.json();
        }

        async function FetchLocations() {
            const response = await fetch(locations);
            return await response.json();
        }

        const caching = {cacheTime: 24 * 60 * 60 * 1000};
        const {isLoading: isLoadingCareers, data: dataResults} = useQuery('results', FetchResults, caching)
        const {isLoading: isLoadingLocations, data: dataLocations} = useQuery('locations', FetchLocations, caching);

        if (isLoadingCareers || isLoadingLocations) {
            return (
                <div id={"insert-header"}>
                    <div id={"insert-header-wrapper"}>
                        <h3 id={'loading'}>{"Loading..."}</h3>
                    </div>
                </div>
            );
        }

        function getCurrentDate() {
            const date = new Date();
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        }

        function completedCertification(gradDate: string) {
            const date = new Date();
            const targetDate = new Date(gradDate);
            const timeElapsed = date.getTime() - targetDate.getTime();
            const daysElapsed = timeElapsed / (1000 * 60 * 60 * 24);
            const roundedDaysElapsed = Number(daysElapsed.toFixed(2));
            return {"days_elapsed": daysElapsed, "rounded_days_elapsed": roundedDaysElapsed};
        }

        const gradDate = completedCertification("2022-12-14")
        const currentDate = getCurrentDate()

        return (
            <div id={"insert-header"}>
                <div className="insight">
                    <img src="https://img.icons8.com/fluency-systems-regular/24/333333/tear-off-calendar.png"
                         alt={"calender"}/>
                    <h2 id={"insert-header-title"}>{currentDate}</h2>
                </div>
                <div className="insight">
                    <img src="https://img.icons8.com/ios/24/333333/place-marker--v1.png" alt={"location"}/>
                    <h2>Most applied: {dataLocations.name}, {dataLocations.value}</h2>
                </div>
                <div className="insight">
                    <img src="https://img.icons8.com/ios/24/333333/overview-pages-3.png" alt={"applications"}/>
                    <h2>{dataResults.length} applications.</h2>
                </div>
                <div className="insight">
                    <img src="https://img.icons8.com/pastel-glyph/24/333333/graduation-cap--v3.png"
                         alt={"graduation"}/>
                    <h2>{gradDate.rounded_days_elapsed} days since graduation.</h2>
                </div>
                <div className="insight">
                    <img
                        src="https://img.icons8.com/external-outlines-amoghdesign/24/333333/external-analysis-education-vol-01-outlines-amoghdesign.png"
                        alt={"ratio"}/>
                    <h2>{Number(dataResults.length / gradDate.days_elapsed).toFixed(2)} applications per day.</h2>
                </div>
                <div className="insight">
                    <iframe
                        title={"dot"}
                        src="https://global-mind.org/gcpdot/gcp.html"
                        height="24" width="24" scrolling="no" frameBorder="0">
                    </iframe>
                    <h2>{"Global Consciousness Project"}</h2>
                </div>
            </div>
        );
    }

    const Message = () => {
        return (
            <div className={"message"}>
                <p id={"insert-message"}></p>
            </div>
        );
    }

    const ChangeMessage = (message: string) => {
        const mess = document.getElementById("insert-message");
        mess!.innerHTML = message;
    }

    const ActiveMessage = (bool = false) => {
        const message = document.getElementsByClassName("message")[0];
        if (!bool) message.classList.remove("active");
        else {
            message.classList.add("active");
            setTimeout(() => {
                message.classList.remove("active");
                ChangeMessage("");
            }, 2000);
        }
    }

    function InputFields() {
        const [lock, setLock] = useState(true);
        const [inputValues, setInputValues] = useState({
            title: "",
            location: "",
            employer: "",
            description: "",
            url: ""
        });

        const input = [
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

        function POSTData(data: any) {
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
            function HandleClick(e: any) {
                if (e.key === "Enter") {
                    const submit = document.getElementById("insert-submit");
                    if (submit && !lock) submit.click();
                }
            }

            document.addEventListener('keydown', HandleClick);
            return () => document.removeEventListener('keydown', HandleClick);
        });

        function resetInputValues() {
            setInputValues({title: "", location: "", employer: "", description: "", url: ""});
        }

        return (
            <div id="insert-input-fields">
                <div id="insert-input-fields-wrapper">
                    {input.map((input, index) => {
                        return (
                            <input
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
                    <button
                        className="buttons"
                        id={"insert-reset"}
                        onClick={resetInputValues}
                    >
                        <img src="https://img.icons8.com/ios/24/F6BD60/recurring-appointment.png" alt={"reset"}/>
                        Reset
                    </button>
                    <button
                        className="buttons"
                        id={"insert-submit"}
                        type="submit"
                        disabled={lock}
                        onClick={() => {
                            POSTData(inputValues);
                            ChangeMessage("Successfully added a new career!");
                            ActiveMessage(true);
                        }}
                    >
                        {lock ?
                            <img src="https://img.icons8.com/ios-glyphs/24/363946/lock--v1.png" alt={"padlock"}/> :
                            <img src="https://img.icons8.com/material/24/363946/checkmark--v1.png" alt={"unlock"}/>}
                    </button>
                </div>
            </div>
        );
    }

    return (
        <CSSTransition in={true} appear={true} timeout={1000} classNames="fade">
            <div id="insert-content">
                <div id={"insert-content-wrapper"}>
                    <Header/>
                    <InputFields/>
                </div>
            </div>
        </CSSTransition>
    );
}

export default Insert;