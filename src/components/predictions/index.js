import css from "./index.module.css";

const geocoder = new window.google.maps.Geocoder();

function Predictions({ predictions, handlePredictionClick }) {
  const handleOptionClick = (placeId, description) => {
    const address = {};
    geocoder.geocode({ placeId }).then(({ results }) => {
      if (results[0]) {
        address.street = description;
        address.lat = results[0].geometry.location.lat();
        address.long = results[0].geometry.location.lng();
        for (let i = 0; i < results[0].address_components.length; i++) {
          if (results[0].address_components[i].types[0] === "locality") {
            address.city = results[0].address_components[i]?.long_name;
          }
          if (
            results[0].address_components[i].types[0] ===
            "administrative_area_level_1"
          ) {
            address.state = results[0].address_components[i]?.long_name;
          }
        }

        handlePredictionClick(address);
      }
    });
  };
  if (!predictions.length) return null;

  return (
    <div className={css.container}>
      {predictions.map((pred, index) => (
        <div
          className={css.content}
          key={index}
          onClick={handleOptionClick.bind(
            null,
            pred.place_id,
            pred.description
          )}
        >
          {pred.description}
        </div>
      ))}
    </div>
  );
}

export default Predictions;
