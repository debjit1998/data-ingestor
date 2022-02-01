import { useState, Fragment } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Alert from "../alert";
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

const FIELD_NAMES = {
  fName: "First Name",
  lName: "Last Name",
  phone: "Phone Number",
  address: "Full Address",
  source: "Source",
  remark: "Remark",
};

function SingleMode() {
  const [values, setValues] = useState(defaultValues);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const regex = new RegExp(/^[0-9]+$/);
    if (name === "phone") {
      if (value === "" || (regex.test(value) && value.length <= 10)) {
        setValues((prev) => ({ ...prev, [name]: value }));
        return;
      } else {
        return;
      }
    }
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => setValues(defaultValues);

  const handleSave = () => {
    const keys = Object.keys(values);
    for (let key of keys) {
      if (!values[key]) {
        setError({
          fieldName: key,
          header: "Empty Field",
          content: `${FIELD_NAMES[key]} cannot be empty. Please provide some value.`,
        });
        setOpen(true);
        return;
      }
      if (key === "phone" && values[key].length < 10) {
        setError({
          fieldName: key,
          header: "Validation Failed",
          content: `Please provide a 10 digit valid ${FIELD_NAMES[key]}.`,
        });
        setOpen(true);
        return;
      }
    }

    setError(null);
  };

  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      {open && (
        <Alert
          open={open}
          header={error.header}
          content={error.content}
          handleClose={handleClose}
        />
      )}
      <div className={css.singleMode}>
        <div className={css.textContainer}>
          <TextField
            helperText="Please enter first name"
            id="fName"
            label={FIELD_NAMES.fName}
            name="fName"
            value={values.fName}
            onChange={handleChange}
            className={css.textInput}
            error={error?.fieldName === "fName"}
          />
          <TextField
            helperText="Please enter last name"
            id="lName"
            label={FIELD_NAMES.lName}
            name="lName"
            value={values.lName}
            onChange={handleChange}
            className={css.textInput}
            error={error?.fieldName === "lName"}
          />
          <TextField
            helperText="Please enter phone number"
            id="phone"
            label={FIELD_NAMES.phone}
            name="phone"
            value={values.phone}
            onChange={handleChange}
            className={css.textInput}
            error={error?.fieldName === "phone"}
          />
          <TextField
            helperText="Please enter source name"
            id="source"
            label={FIELD_NAMES.source}
            name="source"
            value={values.source}
            onChange={handleChange}
            className={css.textInput}
            error={error?.fieldName === "source"}
          />
          <TextField
            helperText="Please enter full address"
            id="address"
            label={FIELD_NAMES.address}
            name="address"
            value={values.address}
            onChange={handleChange}
            className={css.address}
            error={error?.fieldName === "address"}
          />
        </div>
        <div className={css.remarksContainer}>
          <h3 className={css.remarksHeader}>Please provide a remark</h3>
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
        <Button
          variant="contained"
          className={css.saveButton}
          onClick={handleSave}
        >
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
    </Fragment>
  );
}

export default SingleMode;
