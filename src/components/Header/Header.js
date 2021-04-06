import React, { useState } from 'react';
import styles from './Header.module.scss';
import { Search as SearchIcon } from '@material-ui/icons';
import { Tooltip } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import UserMenu from './UserMenu';
import { useSelector } from 'react-redux';
import { getUser, getUserLoading } from '../../redux/selectors/user';
import { getVideosByTitle } from '../../service';
import Sidebar from '../Sidebar/Sidebar';
import GuestHeader from '../common/GuestHeader/GuestHeader';

export default function Header() {
    const user = useSelector(getUser);
    const history = useHistory();
    const [inputSearchValue, setInputSearchValue] = useState('');
    const [options, setOptions] = useState([]);
    const isUserLoading = useSelector(getUserLoading);

    const onInputChange = (e) => {
        const value = e.currentTarget.value;
        setInputSearchValue(value);
        if (value.length) {
            getVideosByTitle(value).then(res => setOptions(res.slice(0, 10)));
        } else {
            setOptions([]);
        }
    };

    const onFocus = () => {
        getVideosByTitle().then(res => setOptions(res.slice(0, 10)));
    };

    const onFocusOut = () => {
        setTimeout(() => {
            setOptions([]);
        }, 100)
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' || e.type === 'click') {
            let value = inputSearchValue.trim().split(' ').map(el => el.toLowerCase().trim()).join('+');
            if (value.length) {
                history.push('/search/' + value);
            }
        }
    };

    const userHeader = (
        <div id={styles.userIcons}>
            <UserMenu />
        </div>);

    return (
        <div className={styles.headerContainer}>
            <div className={styles.header}>
                <Sidebar />
                <div className={styles.searchContainer}>
                    <input onFocus={onFocus} onBlur={onFocusOut} type="text" placeholder="Search" value={inputSearchValue} onChange={onInputChange} onKeyPress={handleKeyPress}></input>
                    <div className={styles.optionsList}>
                        {options.length ? options.map(opt => <a key={opt.id} href={`/video/${opt.id}`}>{opt.title}</a>) : null}
                    </div>
                    <Tooltip title="Search">
                        <span onClick={handleKeyPress} className={styles.searchCont}><SearchIcon className={styles.searchIcon} fontSize="small" /></span>
                    </Tooltip>
                </div>
                {!isUserLoading ?
                    <div className={styles.userContainer}>
                        {user ? userHeader : <GuestHeader />}
                    </div> : <p>Loading</p>}
            </div>
        </div>
    )
}
