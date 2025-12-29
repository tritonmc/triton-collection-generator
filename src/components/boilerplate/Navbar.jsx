import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

import GitHubIcon from '../icon/GitHubIcon';

const PREFIX = 'Navbar';

const classes = {
  grow: `${PREFIX}-grow`
};

const StyledAppBar = styled(AppBar)({
  [`& .${classes.grow}`]: {
    flexGrow: 1,
  },
});

const Navbar = () => {

  return (
    <StyledAppBar position='static'>
      <Toolbar>
        <Typography variant='h6' component='h1'>
          Triton Collection Generator
        </Typography>
        <div className={classes.grow} />
        <IconButton
          component='a'
          href='https://github.com/diogotcorreia/triton-collection-generator'
          target='_blank'
          rel='noopenner'
          size="large">
          <GitHubIcon />
        </IconButton>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Navbar;
