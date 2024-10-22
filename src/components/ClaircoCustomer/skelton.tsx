import React from 'react';

const skelton = () => {
    return (
        <div>
            <div className="card" aria-hidden="true">
                {/* <img src="..." className="card-img-top" alt="..." /> */}
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>

                    <p className="card-text placeholder-glow">
                        <span className="placeholder row-8"></span>
                        <span className="placeholder row-4"></span>
                        <span className="placeholder row-4"></span>
                        <span className="placeholder row-6"></span>
                        <span className="placeholder row-8"></span>
                    </p>
                    {/* <a href="#" tabIndex="-1" class="btn btn-primary disabled placeholder col-6"></a> */}
                </div>
                <div className="card-body">
                    <h5 className="card-title placeholder-glow">
                        <span className="placeholder col-6"></span>
                    </h5>
                    <p className="card-text placeholder-glow">
                        <span className="placeholder col-7"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-4"></span>
                        <span className="placeholder col-6"></span>
                        <span className="placeholder col-8"></span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default skelton;
