// react
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import styles from './UserProfile.module.scss';
// service
import { getCurrentUserHistory, getCurrentUserInfo, getCurrentUserLiked } from '../../service/service';
// redux
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors/user';
// components
import ScrollableTabsButtonAuto from './CurrentUserTabs';
import Layout from '../Layout/Layout';

export default function UserProfile() {
    const { id } = useParams();
    const [user, setUser] = useState(null);
    const [history, setHistory] = useState([]);
    const [liked, setLiked] = useState([]);
    const currentUser = useSelector(getUser);
    //const myVideos = useSelector(state => state.videos.videos.filter(video => video.authorId === currentUserId))
    useEffect(() => {
        // if(id !== currentUser.id)
        getCurrentUserInfo(id).then(res => setUser(res.data()));
        getCurrentUserHistory(id).then(res => setHistory(res));
        getCurrentUserLiked(id).then(res => setLiked(res));
    }, [id]);

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.profileContainer}>
                    <div className={styles.profileInfo}>
                        {user && currentUser ?
                            <>
                                {user.photoURL && <img className={styles.icon} src={user.photoURL} alt='user logo' />}
                                {!user.photoURL && <h1 className={styles.icon}>{user.displayName[0]}</h1>}
                                <div className={styles.infoBox}>
                                    <h1 className={styles.names}>{user.displayName}</h1>
                                    {user.uid === currentUser.uid ? <h1 className={styles.email}>{user.email}</h1> : null}
                                </div>
                            </> : null}
                    </div>
                    {user && currentUser ?
                        <ScrollableTabsButtonAuto
                            history={user.uid === currentUser.uid ? history : null}
                            liked={liked}
                            user={user}
                            currentUser={currentUser} />
                        : null}
                </div >
            </div>
        </Layout>
    )
}