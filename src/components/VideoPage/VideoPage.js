// react
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './VideoPage.module.scss';
// service
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors/user';
import { getComments } from '../../redux/actions/comments';
// components
import ReactPlayer from 'react-player';
import Header from '../Header/Header';
import CommentsContainer from './CommentsContainer';
import PlayNextVideos from './PlayNextVideos';
import VideoInfo from './VideoInfo';
import { increaseViews } from '../../service/service';

export default function VideoPage() {
    const dispatch = useDispatch();
    const { id } = useParams();
    const video = useSelector(state => state.videos.videos.find(video => video.id === id));
    const comments = useSelector(state => state.comments.comments.filter(comment => comment.videoID === id));
    const user = useSelector(getUser);

    useEffect(() => {
        if (video) {
            dispatch(getComments(id));
            dispatch(increaseViews(video));
        }
    }, []);

    return (
        <>
            <Header />
            <div className={styles.videoContainer}>
                {video && user ?
                    <div className={styles.container}>
                        <ReactPlayer url={video.url} controls playing={true} className={styles.video} />
                        <div className={styles.hashtags}>
                            {`#${video.title} #video #${video.views}views #youtube`}
                        </div>
                        <VideoInfo video={video} user={user} />
                        <CommentsContainer currentVideo={video} comments={comments} id={id} />
                    </div> : null}
                <PlayNextVideos />
            </div>
        </>
    );
}