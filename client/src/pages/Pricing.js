import React, { useRef, useState } from 'react'
import Layout from '../components/Layout/Layout'
const Pricing = () => {
    const [flag, setFlag] = useState(0);

    const handleClick = () => {
        setFlag((prev) => prev + 1);
    }

    const rows = ["Bus Stand", "Railway Station", "College Main Gate", "PAP Chowk", "Nakodar Chowk", "Mandir"];
    const columns = [...rows];

    function generateRandomArray(rows, columns) {
        const randomArray = {};

        for (const row of rows) {
            randomArray[row] = {};
        }
        randomArray["Bus Stand"]["Bus Stand"] = 0;
        randomArray["Bus Stand"]["Railway Station"] = 50;
        randomArray["Bus Stand"]["College Main Gate"] = 100;
        randomArray["Bus Stand"]["PAP Chowk"] = 200;
        randomArray["Bus Stand"]["Nakodar Chowk"] = 300;
        randomArray["Bus Stand"]["Mandir"] = 400;

        randomArray["Railway Station"]["Bus Stand"] = 50;
        randomArray["Railway Station"]["Railway Station"] = 0;
        randomArray["Railway Station"]["College Main Gate"] = 100;
        randomArray["Railway Station"]["PAP Chowk"] = 200;
        randomArray["Railway Station"]["Nakodar Chowk"] = 300;
        randomArray["Railway Station"]["Mandir"] = 400;

        randomArray["College Main Gate"]["Bus Stand"] = 50;
        randomArray["College Main Gate"]["Railway Station"] = 100;
        randomArray["College Main Gate"]["College Main Gate"] = 0;
        randomArray["College Main Gate"]["PAP Chowk"] = 200;
        randomArray["College Main Gate"]["Nakodar Chowk"] = 300;
        randomArray["College Main Gate"]["Mandir"] = 400;

        randomArray["PAP Chowk"]["Bus Stand"] = 50;
        randomArray["PAP Chowk"]["Railway Station"] = 70;
        randomArray["PAP Chowk"]["College Main Gate"] = 100;
        randomArray["PAP Chowk"]["PAP Chowk"] = 0;
        randomArray["PAP Chowk"]["Nakodar Chowk"] = 300;
        randomArray["PAP Chowk"]["Mandir"] = 400;

        randomArray["Nakodar Chowk"]["Bus Stand"] = 50;
        randomArray["Nakodar Chowk"]["Railway Station"] = 30;
        randomArray["Nakodar Chowk"]["College Main Gate"] = 100;
        randomArray["Nakodar Chowk"]["PAP Chowk"] = 200;
        randomArray["Nakodar Chowk"]["Nakodar Chowk"] = 0;
        randomArray["Nakodar Chowk"]["Mandir"] = 400;

        randomArray["Mandir"]["Bus Stand"] = 50;
        randomArray["Mandir"]["Railway Station"] = 20;
        randomArray["Mandir"]["College Main Gate"] = 100;
        randomArray["Mandir"]["PAP Chowk"] = 600;
        randomArray["Mandir"]["Nakodar Chowk"] = 500;
        randomArray["Mandir"]["Mandir"] = 0;

        return randomArray;
    }


    const randomArray = generateRandomArray(rows, columns);

    const [startLocation, setStartLocation] = useState('');
    const [finalLocation, setFinalLocation] = useState('');


    const handleOptionChange1 = (event) => {
        setStartLocation(event.target.value);
    };

    const handleOptionChange2 = (event) => {
        setFinalLocation(event.target.value);
    };
    return (
        <Layout>
            <div className='container my-2'>
                <div className="pricing-form">
                    <div className="p-f-i">
                        <select className='my-2 select-box-p' id="startLocation" name="startLocation" value={startLocation} onChange={handleOptionChange1}>
                            <option value="Select Source">Select Source</option>
                            <option value="Bus Stand">Bus Stand</option>
                            <option value="Railway Station">Railway Station</option>
                            <option value="College Main Gate">College Main Gate</option>
                            <option value="PAP Chowk">PAP Chowk</option>
                            <option value="Nakodar Chowk">Nakodar Chowk</option>
                            <option value="Mandir">Mandir</option>
                        </select>
                    </div>
                    <div className="p-f-i">
                        <select className='my-2 select-box-p' id="finalLocation" name="finalLocation" value={finalLocation} onChange={handleOptionChange2}>
                            <option value="Select Destination">Select Destination</option>
                            <option value="Bus Stand">Bus Stand</option>
                            <option value="Railway Station">Railway Station</option>
                            <option value="College Main Gate">College Main Gate</option>
                            <option value="PAP Chowk">PAP Chowk</option>
                            <option value="Nakodar Chowk">Nakodar Chowk</option>
                            <option value="Mandir">Mandir</option>
                        </select>
                    </div>
                    <button type='submit' className='btn btn-primary my-1' onClick={handleClick}>Check Price</button>
                </div>
                <div className="my-3 text-center">
                    {flag !== 0 ? <p>Price: {randomArray[startLocation][finalLocation]}</p> : <p>Search Something...</p>}
                </div>
            </div>

        </Layout>
    )
}
export default Pricing;