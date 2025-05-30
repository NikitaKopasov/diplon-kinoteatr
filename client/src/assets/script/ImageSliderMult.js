import React, { useEffect, useState, useRef } from 'react';
import '../css/sliderImages.css';
import arrowleft from "../images/left-arrow.png"
import arrowright from "../images/right-arrow.png"

const MultSlider1 = 'http://localhost:5000/slider/MultSlider1.png';
const MultSlider2 = 'http://localhost:5000/slider/MultSlider2.png';
const MultSlider3 = 'http://localhost:5000/slider/MultSlider3.png';
const MultSlider4 = 'http://localhost:5000/slider/MultSlider4.png';
const MultSlider5 = 'http://localhost:5000/slider/MultSlider5.png';

const images = [
  MultSlider1, MultSlider2,
  MultSlider3, MultSlider4, MultSlider5
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null);

  const handlePointClick = (index) => {
    setCurrentIndex(index);
  };

  const handleLeftClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleRightClick = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const startAutoSlide = () => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  };

  const stopAutoSlide = () => {
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <div
      className="blockSlider"
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      <div className="FullArea">
        <div className="imagesArea">
          {images.map((src, index) => (
            <img
              key={index}
              className={`imageSlider ${index === currentIndex ? 'activeImage' : ''}`}
              src={src}
              alt={`Slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="pointsAreaSize">
          {images.map((_, index) => (
            <span
              key={index}
              className={`point ${index === currentIndex ? 'activeImage' : ''}`}
              onClick={() => handlePointClick(index)}
            ></span>
          ))}
        </div>

        <div className="btnsAreaSize">
          <div className="blockArrow" onClick={handleLeftClick}>
            <img src={arrowleft} className='fa fa-angle-left'></img>
          </div>
          <div className="blockArrow" onClick={handleRightClick}>
            <img src={arrowright} className='fa fa-angle-right'></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
