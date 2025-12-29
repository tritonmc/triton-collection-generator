import { Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';

const PREFIX = 'Footer';

const classes = {
  root: `${PREFIX}-root`
};

const Root = styled('div')((
  {
    theme
  }
) => ({
  [`&.${classes.root}`]: {
    marginTop: theme.spacing(3),
  }
}));

const Footer = () => {

  return (
    <Root className={classes.root}>
      <Typography variant='body2'>
        {`Copyright © ${new Date().getFullYear()} `}
        <Link href='https://diogotc.com' color='secondary'>
          Diogo Correia
        </Link>
        {` (Rexcantor64)`}
      </Typography>
    </Root>
  );
};

export default Footer;
