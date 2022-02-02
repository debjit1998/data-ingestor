import { useState, Fragment, useEffect, useRef } from "react";
import {
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Alert from "../alert";
import Predictions from "../predictions";
import useGoogleAutocomplete from "../../hooks/useGoogleAutocomplete";
import {
  defaultValues,
  defaultAddressValues,
  REMARKS,
  FIELD_NAMES,
  GENDER,
  ADDRESS_TYPE,
} from "../../utils/default";
import css from "./index.module.css";

function SingleMode() {
  const [values, setValues] = useState(defaultValues);
  const [address, setAddress] = useState(defaultAddressValues); //eslint-disable-line
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [showPred, setShowPred] = useState(false);
  const { predictions } = useGoogleAutocomplete(search);
  const searchRef = useRef(null);

  useEffect(() => {
    const elem = searchRef.current;
    const blur = () => setShowPred(false);

    const focus = (e) => {
      e.stopPropagation();
      setShowPred(true);
    };

    elem.addEventListener("click", focus);
    document.addEventListener("click", blur);

    return () => {
      document.removeEventListener("click", blur);
      elem.removeEventListener("click", focus);
    };
  }, []);

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

  const handleReset = () => {
    setValues(defaultValues);
    setAddress(defaultAddressValues);
    setSearch("");
    setError(null);
  };

  const handleSave = async () => {
    const keys = Object.keys(values);
    for (let key of keys) {
      if (!values[key].trim()) {
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

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handlePredictionClick = (address) => {
    setAddress(address);
    setValues((prev) => ({ ...prev, street: address.street }));
    setSearch(address.street);
    setShowPred(false);
  };

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
            helperText="Please enter full name"
            id="name"
            label={FIELD_NAMES.name}
            name="name"
            value={values.name}
            onChange={handleChange}
            className={css.textInput}
            error={error?.fieldName === "name"}
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
          <div className={css.searchContainer}>
            <TextField
              helperText="Please enter location to search"
              id="search"
              label="Search Street Name"
              name="search"
              value={search}
              onChange={handleSearch}
              className={css.textInput}
              ref={searchRef}
            />
            {showPred && (
              <Predictions
                predictions={predictions}
                handlePredictionClick={handlePredictionClick}
              />
            )}
          </div>
          <TextField
            helperText="Please select street name from search"
            id="street"
            label={FIELD_NAMES.street}
            name="street"
            value={values.street}
            onChange={handleChange}
            className={css.textInput}
            error={error?.fieldName === "street"}
            disabled
          />
          <TextField
            helperText="Please enter landmark"
            id="landmark"
            label={FIELD_NAMES.landmark}
            name="landmark"
            value={values.landmark}
            onChange={handleChange}
            className={css.textInput}
            error={error?.fieldName === "landmark"}
          />
          <div className={css.genderContainer}>
            <h3 className={css.genderHeader}>Please select the address type</h3>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="addressType"
                name="addressType"
                value={values.addressType}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={ADDRESS_TYPE.home}
                  control={<Radio />}
                  label="Home"
                />
                <FormControlLabel
                  value={ADDRESS_TYPE.work}
                  control={<Radio />}
                  label="Work"
                />
                <FormControlLabel
                  value={ADDRESS_TYPE.office}
                  control={<Radio />}
                  label="Office"
                />
              </RadioGroup>
            </FormControl>
          </div>
          <div className={css.genderContainer}>
            <h3 className={css.genderHeader}>Please select the gender</h3>
            <FormControl component="fieldset">
              <RadioGroup
                row
                aria-label="gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
              >
                <FormControlLabel
                  value={GENDER.male}
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value={GENDER.female}
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value={GENDER.others}
                  control={<Radio />}
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
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
