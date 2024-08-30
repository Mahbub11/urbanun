import React from "react";
import { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import "./embla.css";
import Image, { StaticImageData } from "next/image";

type Image = {
  src: StaticImageData; // URL or imported image source
  alt: string;
};
type PropType = {
  slides: Image[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
           
          {slides.map((image, index) => (
            <div className="embla__slide" key={index}>
                
              <Image src={image.src}
                alt={image.alt}
                layout="" // Ensure image fills the container
                objectFit="cover" // Cover the slide area
                priority // Load images early for better performance
                className="embla__image"
                ></Image>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
