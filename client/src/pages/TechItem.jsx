import React from 'react'
function TechItem({ item }) {
    return (
        <>
            <p className='card-text'>
                <div className="hover-display">
                    <img src={`https://skillicons.dev/icons?i=${item}`} alt="img" style={{ margin: "2px" }} />
                    <div className="tooltip">{item}</div>
                </div>
            </p>
        </>

    );
}

export default TechItem
