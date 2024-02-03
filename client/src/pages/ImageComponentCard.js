import React from 'react'

function ImageComponentCard({ img_link, card_title, card_text }) {
    return (
        <>
            <div class="card" style={{ width: "18rem" }}>
                <img src={img_link} class="card-img-top" alt="..." />
                <div class="card-body">
                    <h5 class="card-title">{card_title}</h5>
                    {/* <p class="card-text">{card_text}</p> */}
                </div>
            </div>
        </>
    );
}

export default ImageComponentCard
