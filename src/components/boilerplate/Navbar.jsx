import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import GitHubIcon from '../icon/GitHubIcon';

const useStyles = makeStyles({
  grow: {
    flexGrow: 1,
  },
});

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>Triton Collection Generator</Typography>
        <div className={classes.grow} />
        <IconButton
          component='a'
          href='https://github.com/diogotcorreia/triton-collection-generator'
          target='_blank'
          rel='noopenner'
        >
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
