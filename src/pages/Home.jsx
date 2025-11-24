import Carousel from "../components/Carousel";
import img1 from '../assets/images/img-1.jpg'
import img2 from '../assets/images/img-2.jpg'
import img3 from '../assets/images/img-3.jpeg'

function Home(){
    return (
        <>
        <Carousel />
        {/* //section cards news */}
        <section className="cards-new">
            <div className="container text-center">
                <div className="container text-center">
                <div className="row justify-content-center align-items-center">
                    <div className="col">
                    Company News
                    </div>
                </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                    <div className="card" >
                            <img src={img1} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                        </div>
                    </div>
                    <div className="col">
                    <div className="card" >
                            <img src={img2} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                        </div>
                    </div>
                    <div className="col">
                    <div className="card" >
                            <img src={img3} className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                                    <a href="#" className="btn btn-primary">Go somewhere</a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        </>
    );
}

export default Home;