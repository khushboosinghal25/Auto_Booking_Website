import React from 'react';

const ListItem = ({ title, image, github, linkedin }) => {
    return (
        <div className="abt-cont">
            <div class="card mb-3 rs-card">
                <div class="row g-0">
                    <div class="col-md-4 rs-img">
                        <img src={image} class="img-fluid rounded-start" alt={title} style={{ height: "100%", width: "150px" }} />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{title}</h5>
                            <p class="card-text rs-card-text">
                                <a href={github} className='btn btn-primary rs-card-text-link' target="_blank" rel="noopener noreferrer">Github</a>
                                <a href={linkedin} className='btn btn-primary rs-card-text-link' target="_blank" rel="noopener noreferrer">LinkedIn</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListItem;
