import Carousel from 'react-bootstrap/Carousel';

export default function LoginCarousel() {
  return (
    <Carousel controls={false} indicators={false}>
      <Carousel.Item interval={4000}>
        <div 
          style={{backgroundImage: "url('../images/Photos/torre_di_pisa.jpg')"}}
          className="carousel-item carousel-image active"
        ></div>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <div 
          style={{backgroundImage: "url('../images/Photos/cattedrale.jpg')"}}
          className="carousel-item carousel-image active"
        ></div>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <div 
          style={{backgroundImage: "url('../images/Photos/battistero.jpg')"}}
          className="carousel-item carousel-image active"
        ></div>
      </Carousel.Item>
    </Carousel>
  );
}