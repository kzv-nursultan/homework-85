import React from 'react';
import Button from "@material-ui/core/Button";

const SubmitBtn = () => {
  return (
    <Button
      type='submit'
      size='large'
      variant='contained'
      color='primary'
      style={{margin:'10px auto'}}>
      Send
    </Button>
  );
};

export default SubmitBtn;