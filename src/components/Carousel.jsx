import kfa1 from '../assets/images/kfa-1.jpg';
import kfa2 from '../assets/images/kfa-2.jpg';

function Carousel () {
    return (
        <>
            <div id="carouselExample" className="carousel slide">
            <div className="carousel-inner">
            <div className="carousel-item active">
            <img src={kfa1} className="d-block w-100" alt="..." />
            </div>
            <div className="carousel-item">
            <img src={kfa2} className="d-block w-100" alt="..." />
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
        </>

    );
}

export default Carousel;