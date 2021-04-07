import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import { Link } from 'react-router-dom';

import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import styles from './OpenVideo.module.scss';

export default function Popup({ content, button, text }) {
    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div>
                    <div variant="contained" {...bindTrigger(popupState)}>
                        {button}
                    </div>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center',
                        }}
                    >
                        <Box p={2} className={styles.messageContainer}>
                            <Typography>
                                <p>
                                    <p>{content}</p>
                                    <p className={styles.info}>{text}</p>
                                    <Link to="/signin" className={styles.signin}>SIGN IN</Link>
                                </p>
                            </Typography>
                        </Box>
                    </Popover>
                </div>
            )}
        </PopupState>
    );
}