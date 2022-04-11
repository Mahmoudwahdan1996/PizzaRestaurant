import classes from "./Navbar.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  return (
    <div className={classes.container}>
      <div className={classes.item}>
        <div className={classes.callButton}>
          <Image src="/img/telephone.png" alt="" width={32} height={32} />
        </div>
        <div className={classes.texts}>
          <div className={classes.text}>ORDER NOW!</div>
          <div className={classes.text}>010 07928 381</div>
        </div>
      </div>
      <div className={classes.item}>
        <ul className={classes.list}>
          <Link href="/" passHref>
            <li className={classes.listItem}>Home</li>
          </Link>
          <li className={classes.listItem}>Products</li>
          <li className={classes.listItem}>Menu</li>
          <Image
            src="/img/pizza-delivery-logo--removebg-preview.png"
            alt=""
            width={225}
            height={125}
            className={classes.logo}
          />
          <li className={classes.listItem}>Events</li>
          <li className={classes.listItem}>Blog</li>
          <li className={classes.listItem}>Contact</li>
        </ul>
      </div>
      <Link href="/cart" passHref>
        <div className={classes.item}>
          <div className={classes.cart}>
            <Image src="/img/cart.png" alt="" width={30} height={30} />
            <span className={classes.counter}>{quantity}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
