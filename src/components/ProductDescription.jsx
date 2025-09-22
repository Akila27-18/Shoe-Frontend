import React from "react";

const defaultDescription = {
  title: "Product Details",
  text: `The Harlan men's boat shoes from Comfy Steps are a classic style suitable for all-day wear. 
  The design features a tan upper with navy blue accents and intricate white stitching for a smart, casual finish. 
  Complete with a padded tongue and lace up fastening for an easy, quick and secure fit, 
  while the gripped outsole provides stability and security.`,
};

const ProductDescription = ({ description = defaultDescription }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-gray-900">{description.title}</h3>
      <p className="mt-2 text-gray-600">{description.text}</p>
    </div>
  );
};

export default ProductDescription;
