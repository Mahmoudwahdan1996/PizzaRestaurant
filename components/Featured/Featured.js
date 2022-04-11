import Image from "next/image";
import { useState } from "react";
import classes from "./Featured.module.css";

const Featured = () => {
  const [index, setIndex] = useState(0);
  const images = [
    "/img/featured.png",
    "/img/featured2.png",
    "/img/featured3.png",
    "/img/featured3.png",
  ];

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : images.length - 1);
    }
    if (direction === "r") {
      setIndex(index !== images.length - 1 ? index + 1 : 0);
    }
  };
  return (
    <div className={classes.container}>
      <div className={classes.arrowContainer} onClick={() => handleArrow("l")}>
        <Image
          src="/img/arrowl.png"
          alt="move-left"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div
        className={classes.wrapper}
        style={{
          transform: `translateX(${-100 * index}vw)`,
          width: `${images.length * 100}vw`,
        }}
      >
        {images.map((img, i) => (
          <div key={i} className={classes.imgContainer}>
            <Image
              src={img}
              layout="fill"
              objectFit="contain"
              alt="fatured pizza"
            />
          </div>
        ))}
      </div>
      <div className={classes.arrowContainer} onClick={() => handleArrow("r")}>
        <Image
          src="/img/arrowr.png"
          alt="move-right"
          layout="fill"
          objectFit="contain"
        />
      </div>
    </div>
  );
};

export default Featured;
