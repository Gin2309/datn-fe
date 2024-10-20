export const formatDistance = (meters) => {
  if (typeof meters === "string") {
    meters = parseFloat(meters.replace(",", "."));
  }

  if (isNaN(meters)) {
    return "Không có thông tin";
  }

  if (meters >= 1000) {
    const kilometers = meters / 1000;
    const roundedKm = kilometers.toFixed(1).replace(".", ",");
    return `${roundedKm} Km`;
  } else {
    return `${meters} m`;
  }
};
