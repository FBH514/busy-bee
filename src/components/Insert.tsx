function Insert() {

    // left side: insert
    // right side: preview

    function InputFields() {

        const Input = [
            {name: "title", type: "text", placeholder: "Title"},
            {name: "location", type: "text", placeholder: "Location"},
            {name: "employer", type: "text", placeholder: "Employer"},
            {name: "description", type: "text", placeholder: "Description"},
            {name: "url", type: "text", placeholder: "URL"}
        ]


        return (
            <div id="insert-input-fields">
                <div className="insert-input-fields-wrapper">
                    {Input.map((input, index) => {
                        return (
                            <div className="input-field" key={index}>
                                <input type={input.type} name={input.name} placeholder={input.placeholder}/>
                            </div>
                        )
                    })}
                    <div className="button">
                        <button type="submit">Submit</button>
                    </div>
                </div>
            </div>
        );
    }


    return(
        <div id="insert-content">
            <div id={"insert-content-wrapper"}>
                <div id={"insert-content-left"}>
                    <InputFields/>
                </div>
                <div id={"insert-content-right"}>
                </div>
            </div>
        </div>
    );
}

export default Insert;