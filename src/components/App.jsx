import { Container } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import DevelopmentWarning from './boilerplate/DevelopmentWarning';
import Footer from './boilerplate/Footer';
import Navbar from './boilerplate/Navbar';
import InputForm from './form/InputForm';

const PREFIX = 'App';

const classes = {
  container: `${PREFIX}-container`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.container}`]: {
    marginTop: theme.spacing(3),
  }
}));

const App = () => {

  return (
    <Root>
      <Navbar />
      <Container fixed className={classes.container}>
        <DevelopmentWarning />
        <InputForm />
        <Footer />
      </Container>
    </Root>
  );
};

export default App;
