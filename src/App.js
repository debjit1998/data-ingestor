import { useState, lazy, Suspense } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Loader from "./components/loader";
import "./App.css";

const SingleMode = lazy(() => import("./components/single"));
const BatchMode = lazy(() => import("./components/batch"));

const MODES = {
  single: "single",
  batch: "batch",
};

function App() {
  const [mode, setMode] = useState(MODES.single);

  const handleChange = (e) => setMode(e.target.value);

  return (
    <div className="app-container">
      <h1>Please select your preffered mode of data upload</h1>
      <FormControl component="fieldset">
        <RadioGroup
          row
          aria-label="modes"
          name="upload-mode"
          value={mode}
          onChange={handleChange}
        >
          <FormControlLabel
            value={MODES.single}
            control={<Radio />}
            label="Single Mode"
          />
          <FormControlLabel
            value={MODES.batch}
            control={<Radio />}
            label="Batch Mode"
          />
        </RadioGroup>
      </FormControl>

      <Suspense fallback={<Loader show={true} />}>
        {mode === MODES.single ? <SingleMode /> : <BatchMode />}
      </Suspense>
    </div>
  );
}

export default App;
