import React from "react";
import { Helmet } from "react-helmet";

const MetaDecorator = ({ title }) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default MetaDecorator;
