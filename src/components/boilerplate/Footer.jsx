import { Link, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='body2'>
        {`Copyright © ${new Date().getFullYear()} `}
        <Link href='https://diogotc.com' color='secondary'>
          Diogo Correia
        </Link>
        {` (Rexcantor64)`}
      </Typography>
    </div>
  );
};

export default Footer;
