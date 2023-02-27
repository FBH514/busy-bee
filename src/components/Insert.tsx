import {useEffect, useState} from "react";

function Insert() {

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
        if (bool) {
            message.classList.add("active");
            setTimeout(() => {
                message.classList.remove("active");
                ChangeMessage("");
            }, 5000);
        } else {
            message.classList.remove("active");
        }
    }

    function InputFields() {

        const [lock, setLock] = useState(true);

        const [inputValues, setInputValues] = useState({
            title: "",
            location: "",
            employer: "",
            description: "",
            url: "",
            icon: "",
        });

        const input = [
            {name: "title", type: "text", placeholder: "Title"},
            {name: "location", type: "text", placeholder: "Location"},
            {name: "employer", type: "text", placeholder: "Employer"},
            {name: "description", type: "text", placeholder: "Description"},
            {name: "url", type: "text", placeholder: "URL"}
        ];

        useEffect(() => {

        })

        useEffect(() => {
            if (inputValues.title !== "" && inputValues.location !== "" && inputValues.employer !== "" && inputValues.description !== "" && inputValues.url !== "") {
                setInputValues({...inputValues, icon: "https://img.icons8.com/ios-glyphs/16/f5f5f5/checkmark--v1.png"});
                setLock(false);
            } else {
                // setInputValues({...inputValues, icon: ""});
                setLock(true);
            }
        }, [inputValues]);

        useEffect(() => {
            const title = document.getElementById("title-preview");
            const location = document.getElementById("location-preview")
            const employer = document.getElementById("employer-preview")
            const description = document.getElementById("description-preview")
            const url = document.getElementById("url-preview")
            const gold = "rgba(214, 173, 96, 0.2)";

            if (inputValues['title'] !== "") {
                title!.innerHTML = inputValues['title'];
                title!.style.color = "#D6AD60";
            }
            else {
                title!.innerHTML = "Title";
                title!.style.color = gold;
            }
            if (inputValues['location'] !== "") {
                location!.innerHTML = inputValues['location'];
                location!.style.color = "#D6AD60";
            }
            else {
                location!.innerHTML = "Location";
                location!.style.color = gold;
            }
            if (inputValues['employer'] !== "") {
                employer!.innerHTML = inputValues['employer'];
                employer!.style.color = "#D6AD60";
            }
            else {
                employer!.innerHTML = "Employer";
                employer!.style.color = gold;
            }
            if (inputValues['description'] !== "") {
                description!.innerHTML = inputValues['description'];
                description!.style.color = "#D6AD60";
            }
            else {
                description!.innerHTML = "Description";
                description!.style.color = gold;
            }
            if (inputValues['url'] !== "") {
                url!.innerHTML = inputValues['url'];
                url!.style.color = "#D6AD60";
            }
            else {
                url!.innerHTML = "URL";
                url!.style.color = gold;
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
                if (response.ok) {
                    return response.json();
                }
            }).then(data => {
                if (data['status'] === 'success') {
                    setInputValues({
                        title: "",
                        location: "",
                        employer: "",
                        description: "",
                        url: "",
                        icon: ""
                    });
                }
            });
        }

        return (
            <div id="insert-input-fields">
                <div id="insert-input-fields-wrapper">
                    {input.map((input, index) => {
                        return (
                            <div className="input-field" key={index} id={"input-" + input.name}>
                                <input
                                    value={inputValues[input.name as keyof typeof inputValues]}
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    onChange={(e) => {
                                        setInputValues({...inputValues, [input.name]: e.target.value});
                                    }}
                                />
                                {inputValues['icon'] !== "" && <img src={inputValues['icon']} alt=""/>}
                            </div>
                        )
                    })}
                    <div id={"insert-buttons"}>
                        <button
                            className="buttons"
                            id={"insert-reset"}
                            onClick={() => {
                                setInputValues({
                                    title: "",
                                    location: "",
                                    employer: "",
                                    description: "",
                                    url: "",
                                    icon: "https://img.icons8.com/ios/32/f5f5f5/delete-sign--v1.png"
                                });
                            }}
                        >Reset</button>
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
                        ></button>
                    </div>
                </div>
            </div>
        );
    }

    function Preview() {

        return (
            <div id="insert-preview">
                <div id="insert-preview-wrapper">
                    <h2 id={"title-preview"}>Title</h2>
                    <h2 id={"location-preview"}>Location</h2>
                    <h2 id={"employer-preview"}>Employer</h2>
                    <h2 id={"description-preview"}>Description</h2>
                    <h2 id={"url-preview"}>URL</h2>
                </div>
            </div>
        )
    }

    return (
        <div id="insert-content">
            <div id={"insert-content-wrapper"}>
                <Message/>
                <div id={"insert-content-left"}>
                    <InputFields/>
                </div>
                <div id={"insert-content-right"}>
                    <Preview/>
                </div>
            </div>
        </div>
    );
}

export default Insert;