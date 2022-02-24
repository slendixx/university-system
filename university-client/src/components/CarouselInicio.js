import Carousel from "react-bootstrap/Carousel";

const CarouselInicio = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="images/home1.jpg" />
        <Carousel.Caption>
          <h3>Una universidad pensada para tu futuro</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="images/home2.jpg" />
        <Carousel.Caption>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="images/home3.jpg" />
        <Carousel.Caption>
          <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default CarouselInicio;
