import React, { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import logo from '../../assets/logo.png';
import styles from './Header.module.scss';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Tooltip } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { isLoggedIn } from '../../utils';
import UserMenu from './UserMenu';

export default function Header({ handleToggleSidebar, sidebar }) {
    const history = useHistory();
    const [inputSearchValue, setInputSearchValue] = useState('');
    const onInputChange = (e) => {
        setInputSearchValue(e.currentTarget.value);
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            let value = inputSearchValue.trim().split(' ').map(el => el.toLowerCase().trim()).join('+');
            history.push('/search/' + value);
        }
    }

    const guestHeader = (
        <a href='/signin' className={styles.links} title='Sign in'>
            <div className={styles.signIn}>
                <AccountCircleIcon />
                <span>SIGN IN</span>
            </div>
        </a>)
    const userHeader = (
        <div id={styles.userIcons}>
            <UserMenu />
        </div>)
    return (
        <div className={styles.header}>
            <div className={sidebar ? styles.newLogoContainer : styles.logoContainer}>
                <MenuIcon className={styles.icons} onClick={handleToggleSidebar} />
                <Tooltip title="YouTube Home" placement="bottom-end">
                    <div className={styles.logo} onClick={() => history.push('/')}>
                        <img className={styles.siteLogo} src={logo} alt="youtube's logo" />
                        <span className={styles.countryCode}>BG</span>
                    </div>
                </Tooltip>
            </div>
            <div className={sidebar ? styles.notActive : styles.otherContainer}>
                <div className={styles.searchContaine}>
                    <input type="text" placeholder="Search" value={inputSearchValue} onChange={(e) => onInputChange(e)} onKeyPress={(e) => handleKeyPress(e)}></input>
                    <Tooltip title="Search">
                        <span onClick={(e) => handleKeyPress(e)} className={styles.searchCont}><SearchIcon className={styles.searchIcon} fontSize="small" /></span>
                    </Tooltip>
                    <Tooltip title="Search with your voice">
                        <KeyboardVoiceIcon className={styles.icons} id={styles.voiceIcon} />
                    </Tooltip>
                </div>
                <div className={styles.userContainer}>
                    {isLoggedIn() ? userHeader : guestHeader}
                </div>
            </div>
        </div>
    )
}