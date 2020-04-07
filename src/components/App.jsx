import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import DevelopmentWarning from './boilerplate/DevelopmentWarning';
import Footer from './boilerplate/Footer';
import Navbar from './boilerplate/Navbar';
import InputForm from './form/InputForm';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <div>
      <Navbar />
      <Container fixed className={classes.container}>
        <DevelopmentWarning />
        <InputForm />
        <Footer />
      </Container>
    </div>
  );
};

export default App;
