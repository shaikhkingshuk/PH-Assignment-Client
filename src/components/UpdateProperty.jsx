import React from "react";
import { useParams } from "react-router";

const UpdateProperty = () => {
  const { propertyId } = useParams();
  return (
    <div>
      <h1>Property id is: {propertyId}</h1>
    </div>
  );
};

export default UpdateProperty;
