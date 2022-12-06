import Carousel from "react-bootstrap/Carousel";

function Jumbotron() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100 jumbo-page"
          src="images/test.webp"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 jumbo-page"
          src="images/test-2.webp"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 jumbo-page"
          src="images/test.webp"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Jumbotron;
