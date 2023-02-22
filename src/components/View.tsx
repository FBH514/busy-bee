import {useEffect, useState} from "react";

function View() {

    const [data, setData] = useState([]);
    const api = "http://localhost:8000/v1/careers";

    useEffect(() => {
        if (data.length === 0) {
            fetch(api).then((response) => {
                return response.json()
            }).then(data => {
                setData(data['careers']);
            })
        }
    }, [data]);

    function Table() {

        return (
            <table id={"view-table"}>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th>Location</th>
                    <th>Employer</th>
                    <th>Description</th>
                    <th>URL</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item: any, index: any) => (
                    <tr key={index}>
                        <td>{item[1]}</td>
                        <td>{item[2]}</td>
                        <td>{item[3]}</td>
                        <td>{item[4]}</td>
                        <td>{item[5]}</td>
                        <td>{item[6]}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        )
    }

    return (
        <div id={"view-content"}>
            <div id={"view-content-wrapper"}>
                <Table/>
            </div>
        </div>
    );
}

export default View;