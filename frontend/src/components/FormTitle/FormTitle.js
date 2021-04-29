import React from 'react';
import {Typography} from "@material-ui/core";

const FormTitle = ({variant, text}) => {
  return (
    <Typography variant={variant} style={{margin:'10px auto'}}>
      {text}
    </Typography>
  );
};

export default FormTitle;