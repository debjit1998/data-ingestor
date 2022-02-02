import { useEffect, useState } from "react";

const google = window.google;
const service = new google.maps.places.AutocompleteService();
let timer = null;

export default function useGoogleAutocomplete(query) {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    if (query) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        service.getPlacePredictions(
          {
            input: query,
            componentRestrictions: {
              country: "in",
            },
          },
          (predictions) => {
            if (predictions) {
              setPredictions(predictions);
            } else {
              setPredictions([]);
            }
          }
        );
      }, 300);
    } else {
      clearTimeout(timer);
      timer = null;
      setPredictions([]);
    }
  }, [query]);

  return { predictions };
}
