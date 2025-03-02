import React, { useState, useEffect } from "react";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import "./carousel.css";

export const Carousel = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5051/Cover"); 
        const jsonData = await response.json();
        const formattedSlides = jsonData.map((item) => ({
          src: `http://localhost:5051/images/${item.image}`,
          alt: item.alt || "Slide Image",
          title: item.title || "Slide Title",
          content: item.content || "Slide Content",
        }));

        setSlides(formattedSlides);
      } catch (error) {
        console.error("Could not fetch data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000);

    return () => clearInterval(interval);
  }, [slides]);

  return (
    <div className="carousel">
      <span onClick={prevSlide} className="arrow arrow-left">
        <RiArrowLeftSLine size="30" />
      </span>

      {slides.map((item, idx) => (
        <div key={idx} className={currentSlide === idx ? "cSlide" : "cSlide cSlide-hidden"}>
          <img src={item.src} alt={item.alt} />
          <div className="cSlide-content">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        </div>
      ))}

      <span onClick={nextSlide} className="arrow arrow-right">
        <RiArrowRightSLine size="30" />
      </span>

      <span className="cIndicators">
        {slides.map((_, idx) => (
          <button
            key={idx}
            className={currentSlide === idx ? "cIndicator" : "cIndicator cIndicator-inactive"}
            onClick={() => setCurrentSlide(idx)}
          ></button>
        ))}
      </span>
    </div>
  );
};
