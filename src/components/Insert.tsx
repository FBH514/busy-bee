import {useEffect, useState} from "react";

function Insert() {

    // left side: insert
    // right side: preview

    function InputFields() {
        const [inputValues, setInputValues] = useState({
            title: "",
            location: "",
            employer: "",
            description: "",
            url: "",
        });
        const [previewValues, setPreviewValues] = useState({
            title: "input-title",
            location: "input-location",
            employer: "input-employer",
            description: "input-description",
            url: "input-url",
        });
        const [lock, setLock] = useState(true);

        const Input = [
            {name: "title", type: "text", placeholder: "Title"},
            {name: "location", type: "text", placeholder: "Location"},
            {name: "employer", type: "text", placeholder: "Employer"},
            {name: "description", type: "text", placeholder: "Description"},
            {name: "url", type: "text", placeholder: "URL"}
        ]

        useEffect(() => {
            if (inputValues.title !== "" && inputValues.location !== "" && inputValues.employer !== "" && inputValues.description !== "" && inputValues.url !== "") {
                setLock(false);
            } else {
                setLock(true);
            }
        }, [inputValues]);

        useEffect(() => {
            document.getElementById("title-preview")!.innerHTML = inputValues.title;
            document.getElementById("location-preview")!.innerHTML = inputValues.location;
            document.getElementById("employer-preview")!.innerHTML = inputValues.employer;
            document.getElementById("description-preview")!.innerHTML = inputValues.description;
            document.getElementById("url-preview")!.innerHTML = inputValues.url;
        }, [inputValues]);


        function RemoveLock() {
            setLock(false);
        }

        return (
            <div id="insert-input-fields">
                <div id="insert-input-fields-wrapper">
                    {Input.map((input, index) => {
                        return (
                            <div className="input-field" key={index}>
                                <input
                                    id={"input-" + input.name}
                                    type={input.type}
                                    name={input.name}
                                    placeholder={input.placeholder}
                                    onChange={(e) => {
                                        setInputValues({...inputValues, [input.name]: e.target.value});
                                    }}
                                />
                            </div>
                        )
                    })}
                    <div className="button" id={"insert-submit-button"}>
                        <button type="submit" disabled={lock}></button>
                    </div>
                </div>
            </div>
        );
    }

    function Preview() {
        return (
            <div id="insert-preview">
                <div id="insert-preview-wrapper">
                    <h2 id={"title-preview"}>to do</h2>
                    <h2 id={"location-preview"}>to do </h2>
                    <h2 id={"employer-preview"}>to do</h2>
                    <h2 id={"description-preview"}>to do</h2>
                    <h2 id={"url-preview"}>to do</h2>
                </div>
            </div>
        )
    }


    return (
        <div id="insert-content">
            <div id={"insert-content-wrapper"}>
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