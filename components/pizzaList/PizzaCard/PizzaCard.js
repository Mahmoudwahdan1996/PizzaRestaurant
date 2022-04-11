import Image from "next/image";
import Link from "next/link";
import classes from "./PizzaCard.module.css";

const PizzaCard = ({ pizza }) => {
  return (
    <div className={classes.container}>
      <Link href={`/product/${pizza._id}`} passHref>
        <Image src={pizza.img} width={500} height={500} alt="Pizza Item" />
      </Link>
      <h1 className={classes.title}>{pizza.title}</h1>
      <span className={classes.price}>${pizza.prices[0]}</span>
      <p className={classes.desc}>{pizza.desc}</p>
    </div>
  );
};

export default PizzaCard;
