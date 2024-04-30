import React from 'react';

const ListItem = ({ title, image }) => {
    return (
        <div className="abt-cont">
            <div class="card mb-3 rs-card">
                <div class="row g-0">
                    <div class="col-md-4 rs-img">
                        <img src={image} class="img-fluid rounded-start" alt="..." style={{ height: "100%", width: "150px" }} />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">{title}</h5>
                            <p class="card-text rs-card-text">
                                <a href="https://www.github.com" className='btn btn-primary rs-card-text-link'>Github</a>
                                <a href="https://www.linkedin.com" className='btn btn-primary rs-card-text-link'>LinkedIn</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
// girl link
// 	https://cdn-icons-png.flaticon.com/512/9436/9436961.png
export default ListItem;
