import { useState } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import css from "./index.module.css";

const defaultValues = {
  fName: "",
  lName: "",
  phone: "",
  address: "",
  source: "",
  remark: "average",
};

const REMARKS = {
  average: "average",
  good: "good",
  best: "best",
};

function SingleMode() {
  const [values, setValues] = useState(defaultValues);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if ((!value.match(/^[0-9]+$/) || value.length > 10) && !value.length) {
        return;
      }
    }
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => setValues(defaultValues);

  return (
    <div className={css.singleMode}>
      <div className={css.textContainer}>
        <TextField
          helperText="Please enter first name"
          id="fName"
          label="First Name"
          name="fName"
          value={values.fName}
          onChange={handleChange}
          className={css.textInput}
        />
        <TextField
          helperText="Please enter last name"
          id="lName"
          label="Last Name"
          name="lName"
          value={values.lName}
          onChange={handleChange}
          className={css.textInput}
        />
        <TextField
          helperText="Please enter phone number"
          id="phone"
          label="Phone Number"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          className={css.textInput}
        />
        <TextField
          helperText="Please enter source name"
          id="source"
          label="Source"
          name="source"
          value={values.source}
          onChange={handleChange}
          className={css.textInput}
        />
        <TextField
          helperText="Please enter address"
          id="address"
          label="Full Address"
          name="address"
          value={values.address}
          onChange={handleChange}
          className={css.address}
        />
      </div>
      <div className={css.remarksContainer}>
        <h3 className={css.remarksHeader}>Please provide remarks</h3>
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="remark"
            name="remark"
            value={values.remark}
            onChange={handleChange}
          >
            <FormControlLabel
              value={REMARKS.average}
              control={<Radio />}
              label="Average"
            />
            <FormControlLabel
              value={REMARKS.good}
              control={<Radio />}
              label="Good"
            />
            <FormControlLabel
              value={REMARKS.best}
              control={<Radio />}
              label="Best"
            />
          </RadioGroup>
        </FormControl>
      </div>
      <Button variant="contained" className={css.saveButton}>
        SAVE
      </Button>
      <Button
        variant="contained"
        className={css.resetButton}
        color="error"
        onClick={handleReset}
      >
        RESET
      </Button>
    </div>
  );
}

export default SingleMode;
