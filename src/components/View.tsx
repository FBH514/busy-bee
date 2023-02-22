import {useState} from "react";

function View() {

    const [data, setData] = useState([]);
    const api = "http://localhost:8000/v1/careers";

    // function GETData() {
    //     fetch(api)
    //         .then((response) => {
    //             return response.json()
    //         })
    //         .then((data) => {
    //             setData(data['careers']);
    //         })
    // }

    // window.onload = GETData;

    function Table() {

        return (
            <table id={"view-table"}>
                <tbody>
                {data.map((item: any) => (
                    <tr key={item[0]}>
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