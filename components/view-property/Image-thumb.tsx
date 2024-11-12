import Image from "next/image";
import React from "react";

type PropType = {
  selected: boolean;
  index: number;
  image: string;
  onClick: () => void;
};

export const Thumb: React.FC<PropType> = (props) => {
  const { selected, index, onClick, image } = props;

  return (
    <div
      className={"m-auto embla-thumbs__slide".concat(
        selected ? " embla-thumbs__slide--selected" : ""
      )}
    >
      <button
        onClick={onClick}
        type="button"
        className="embla-thumbs__slide__number"
      >
        <Image
          className="rounded-md drop-shadow-sm"
          src={image}
          alt={`Image ${index + 1}`}
          width={150}
          height={150}
        ></Image>
      </button>
    </div>
  );
};
