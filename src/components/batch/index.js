import { useMemo, useCallback, useState, Fragment } from "react";
import { useDropzone } from "react-dropzone";
import { Button, TextField } from "@mui/material";
import Loader from "../loader";
import Alert from "../alert";
import css from "./index.module.css";

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "rgba(0,0,0,0.3)",
  borderStyle: "dashed",
  backgroundColor: "rgba(0,0,0,0.05)",
  color: "rgba(0,0,0,0.5)",
  outline: "none",
  cursor: "pointer",
  transition: "border .24s ease-in-out",
};

const focusedStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

const defaultValues = {
  senderEmail: "",
  receiverEmail: "",
};

const FIELD_NAMES = {
  senderEmail: "Sender Email",
  receiverEmail: "Receiver Email",
};

const validateEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

function BatchMode() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState(defaultValues);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      multiple: false,
      onDrop,
      accept:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel",
    });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleUpload = () => {
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
      if (!validateEmail(values[key])) {
        setError({
          fieldName: key,
          header: "Validation Failed",
          content: `Please provide a valid ${FIELD_NAMES[key]}.`,
        });
        setOpen(true);
        return;
      }
    }
    const formData = new FormData();
    formData.append("dataFile", file);
    formData.append("senderEmail", values.senderEmail);
    formData.append("receiverEmail", values.receiverEmail);
    setLoading(true);
    setError(null);
    setTimeout(() => {
      setLoading(false);
      setFile(null);
      setValues(defaultValues);
    }, 5000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleClose = () => setOpen(false);

  return (
    <Fragment>
      <Loader show={loading} />
      {open && (
        <Alert
          open={open}
          header={error.header}
          content={error.content}
          handleClose={handleClose}
        />
      )}
      <div className={css.textContainer}>
        <TextField
          helperText="Please enter valid sender email"
          id="senderEmail"
          label={FIELD_NAMES.senderEmail}
          name="senderEmail"
          value={values.senderEmail}
          onChange={handleChange}
          className={css.textInput}
          error={error?.fieldName === "senderEmail"}
        />
        <TextField
          helperText="Please enter valid receiver email"
          id="receiverEmail"
          label={FIELD_NAMES.receiverEmail}
          name="receiverEmail"
          value={values.receiverEmail}
          onChange={handleChange}
          className={css.textInput}
          error={error?.fieldName === "receiverEmail"}
        />
      </div>
      <div className={css.container}>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <p className={css.text}>
            Drag 'n' drop the file here, or click to select the file
          </p>
          <p className={css.subtext}>(Accepts only *.xlsx and *.xls files)</p>
        </div>
        <h3 className={css.fileName}>{file && file.name}</h3>
        {file && (
          <div className={css.uploadButton}>
            <Button variant="contained" onClick={handleUpload}>
              UPLOAD
            </Button>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export default BatchMode;
