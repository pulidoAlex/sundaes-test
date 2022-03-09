import Alert from "react-bootstrap/Alert";

import React from "react";

const AlertBanner = ({ message, variant }) => {
  const alertMsg =
    message || "An unexpected error occurred. Please try again later.";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {alertMsg}
    </Alert>
  );
};

export default AlertBanner;
