import classes from "../../styles/Add.module.css";

const AddButton = ({ setClose }) => {
  return (
    <div className={classes.mainAddButton} onClick={() => setClose(false)}>
      add new pizza
    </div>
  );
};

export default AddButton;
