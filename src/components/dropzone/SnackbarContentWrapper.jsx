import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import SnackbarContent from '@mui/material/SnackbarContent';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';

const PREFIX = 'MuiDropzoneSnackbar';

const classes = {
    successAlert: `${PREFIX}-successAlert`,
    errorAlert: `${PREFIX}-errorAlert`,
    infoAlert: `${PREFIX}-infoAlert`,
    warningAlert: `${PREFIX}-warningAlert`,
    message: `${PREFIX}-message`,
    icon: `${PREFIX}-icon`,
    closeButton: `${PREFIX}-closeButton`
};

const StyledSnackbarContent = styled(SnackbarContent)((
    {
        theme
    }
) => ({
    [`&.${classes.successAlert}`]: {
        backgroundColor: theme.palette.success.main,
    },

    [`&.${classes.errorAlert}`]: {
        backgroundColor: theme.palette.error.main,
    },

    [`&.${classes.infoAlert}`]: {
        backgroundColor: theme.palette.info.main,
    },

    [`&.${classes.warningAlert}`]: {
        backgroundColor: theme.palette.warning.main,
    },

    [`& .${classes.message}`]: {
        display: 'flex',
        alignItems: 'center',
        '& > svg': {
            marginRight: theme.spacing(1),
        },
    },

    [`& .${classes.icon}`]: {
        fontSize: 20,
        opacity: 0.9,
    },

    [`& .${classes.closeButton}`]: {}
}));

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

function SnackbarContentWrapper(props) {
    const { className, message, onClose, variant, ...other} = props;
    const Icon = variantIcon[variant];

    return (
        <StyledSnackbarContent
            className={clsx(classes[`${variant}Alert`], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classes.icon} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.closeButton}
                    onClick={onClose}
                    size="large">
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

SnackbarContentWrapper.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default (SnackbarContentWrapper);
