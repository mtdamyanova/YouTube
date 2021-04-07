import React, { useState } from 'react';
import { Drawer, List, Tooltip } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import logo from '../../assets/logo.png';
import blackLogo from '../../assets/blackLogo.png';
import { useHistory } from "react-router-dom";
import styles from './Sidebar.module.scss';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Home, VideoLibrary, History, Whatshot } from '@material-ui/icons';
import { getUser } from '../../redux/selectors/user';

export default function Sidebar() {
    const history = useHistory();
    const theme = useSelector(state => state.theme.theme);

    const [state, setState] = useState(false);
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };
    const mainLogo = (
        <div className={styles.mainLogoContainer}>
            <MenuIcon className={styles.sandwichButton} onClick={toggleDrawer('left', true)} />
            <Tooltip title="YouTube Home" placement="bottom-end">
                <div className={styles.logo} onClick={() => history.push('/')}>
                    <img className={styles.siteLogo} src={theme === 'dark' ? logo : blackLogo} alt="youtube's logo" />
                    <span className={styles.countryCode}>BG</span>
                </div>
            </Tooltip>
        </div>
    )

    const list = (anchor) => (
        <div
            className={styles.sideOpen}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <div onClick={toggleDrawer(anchor, false)} className={styles.openLogo}>{mainLogo}</div>
                <Tooltip title='Home' placement="right">
                    <Link to="/" className={styles.sidebars}>
                        <Home />
                        <p>Home</p>
                    </Link>
                </Tooltip>
                <Tooltip title='Library' placement="right">
                    <Link to="/library" className={styles.sidebars}>
                        <VideoLibrary />
                        <p>Library</p>
                    </Link>
                </Tooltip>
                <Tooltip title='History' placement="right">
                    <Link to="/history" className={styles.sidebars}>
                        <History />
                        <p>History</p>
                    </Link>
                </Tooltip>
                <Tooltip title='Trending' placement="right">
                    <Link to="/trending" className={styles.sidebars}>
                        <Whatshot />
                        <p>Trending</p>
                    </Link>
                </Tooltip>
            </List>
        </div>
    );

    return (
        <div>
            {mainLogo}
            <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
                {list('left')}
            </Drawer>
        </div>
    );
}