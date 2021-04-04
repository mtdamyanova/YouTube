import { auth, db, storage } from '../../firebase';
import { setLoading, setNotLoading } from '../actions/loadingBar';
import { getVideoWatched, getVideoID, getVideoViews, getVideo } from '../selectors/video';
import { getUser } from '../selectors/user';
import { setAlertOn } from './alertNotifier';
export const FETCH_VIDEOS_SUCCEEDED = 'FETCH_VIDEOS_SUCCEEDED';
export const FETCH_VIDEOS_REQUESTED = 'FETCH_VIDEOS_REQUESTED';
export const UPDATE_VIDEO = 'UPDATE_VIDEO';
export const VIEWS_VIDEO = 'VIEWS_VIDEO';
export const FETCH_MY_VIDEOS_SUCCEEDED = 'FETCH_MY_VIDEOS_SUCCEEDED';
export const FETCH_VIDEO = 'FETCH_VIDEO';
export const INCREASE_VIEWS = 'INCREASE_VIEWS';
export const INCREASE_LIKES = 'INCREASE_LIKES';

export const fetchVideosRequested = () => ({
    type: FETCH_VIDEOS_REQUESTED,
});

export const fetchVideosSucceeded = (videos) => ({
    type: FETCH_VIDEOS_SUCCEEDED,
    payload: videos,
});

export const fetchMyVideosSucceeded = (myVideos) => ({
    type: FETCH_MY_VIDEOS_SUCCEEDED,
    payload: myVideos,
});

export const updateVideo = (video) => ({
    type: UPDATE_VIDEO,
    payload: video,
});

export const updateViews = (video) => ({
    type: VIEWS_VIDEO,
    payload: video
});
export const fetchVideoSucceded = (video) => ({
    type: FETCH_VIDEO,
    payload: video,
});

export const increaseViews = () => ({
    type: INCREASE_VIEWS
})


export const fetchVideos = () => {
    return function (dispatch) {
        dispatch(setLoading());
        dispatch(fetchVideosRequested());
        db.collection('videos').onSnapshot(snapshot => {
            let dbVideos = [];
            snapshot.docs.map(doc => (dbVideos.push({ ...doc.data() })))
            dispatch(fetchVideosSucceeded(dbVideos));
            dispatch(setNotLoading());
        })
    }
};

export const fetchMyVideos = (uid) => {
    return function (dispatch, getState) {
        dispatch(setLoading());
        dispatch(fetchVideosRequested());
        const videosRef = db.collection('videos');
        videosRef.where('authorID', '==', uid).get()
            .then(res => res.docs.map(el => el.data()))
            .then(res => {
                dispatch(fetchMyVideosSucceeded(res));
                dispatch(setNotLoading());
            })
            .catch(err => dispatch(setAlertOn('error', err.message)));
    }
}


export const likeIt = () => {
    return function (dispatch, getState) {
        const currentUser = auth.currentUser.uid;
        const video = getVideo(getState());
        const isLiked = video.isLikedBy.some(user => user === currentUser);
        const isDisliked = video.isDislikedBy.some(user => user === currentUser);
        let currentVideo = video;
        if (isLiked) {
            return;
        } else if (!isLiked && isDisliked) {
            const filterLikes = video.isLikedBy.filter(user => user !== currentUser);
            db.collection('videos').doc(video.id).update({ isDislikedBy: filterLikes, isLikedBy: [...video.isLikedBy, currentUser] })
                .then(() => currentVideo = { ...video, isLikedBy: [...video.isLikedBy, currentUser], filterLikes })
                .catch(err => dispatch(setAlertOn('error', err.message)));
        } else if (!isLiked) {
            db.collection('videos').doc(video.id).update({ isLikedBy: [...video.isLikedBy, currentUser] })
                .then(() => currentVideo = { ...video, isLikedBy: [...video.isLikedBy, currentUser] })
                .catch(err => dispatch(setAlertOn('error', err.message)));
        }

        dispatch(updateVideo(currentVideo));
    }
};

export const dislikeIt = () => {
    return function (dispatch, getState) {
        const currentUser = auth.currentUser.uid;
        const video = getVideo(getState());
        const isLiked = video.isLikedBy.some(user => user === currentUser);
        const isDisliked = video.isDislikedBy.some(user => user === currentUser);
        let currentVideo = video;
        if (isDisliked) {
            return;
        } else if (!isDisliked && isLiked) {
            const filterLikes = video.isLikedBy.filter(user => user !== currentUser);
            db.collection('videos').doc(video.id).update({ isLikedBy: filterLikes, isDislikedBy: [...video.isDislikedBy, currentUser] })
                .then(() => currentVideo = { ...video, filterLikes, isDislikedBy: [...video.isDislikedBy, currentUser] })
                .catch(err => dispatch(setAlertOn('error', err.message)));
        } else if (!isDisliked) {
            db.collection('videos').doc(video.id).update({ isDislikedBy: [...video.isDislikedBy, currentUser] })
                .then(() => currentVideo = { ...video, isDislikedBy: [...video.isDislikedBy, currentUser] })
                .catch(err => dispatch(setAlertOn('error', err.message)));
        }

        return dispatch(updateVideo(currentVideo))
    }
};

export const editIt = (video, title, description) => {
    return function (dispatch) {
        dispatch(setLoading());
        const obj = { ...video, title, description }
        db.collection('videos')
            .doc(video.id)
            .update(obj,
                (error) => {
                    if (error) {
                        dispatch(setAlertOn('error', error.message));
                    }
                }).then(() => {
                    dispatch(updateVideo(obj));
                    dispatch(fetchMyVideos(video.authorID));
                    dispatch(setNotLoading());
                    dispatch(setAlertOn('success', 'Video successfully updated'));
                });
    }
};

export const deleteIt = (video, uid) => {
    return function (dispatch, setState) {
        console.log(video);
        dispatch(setLoading());
        db.collection('videos')
            .doc(video.id)
            .delete()
            .then(() => {
                dispatch(fetchMyVideos(uid));
                dispatch(setNotLoading());
                dispatch(setAlertOn('success', 'Video successfully deleted'));
            })
            .catch(err => dispatch(setAlertOn('error', err.message)));
    }
};
export const changeViews = () => {
    return function (dispatch, getState) {
        const user = getUser(getState());
        const isWatchedBy = getVideoWatched(getState());
        const videoID = getVideoID(getState());
        const videoViews = getVideoViews(getState());
        db.collection("videos")
            .doc(videoID)
            .update({ views: videoViews + 1 })
            .catch(err => dispatch(setAlertOn('error', err.message)));

        if (user && !isWatchedBy.includes(user.uid)) {
            db.collection("videos")
                .doc(videoID)
                .update({ isWatchedBy: [...isWatchedBy, user.uid] })
                .catch(err => dispatch(setAlertOn('error', err.message)));
        }
        return dispatch(increaseViews());
    }
}

export const fetchVideo = (id) => {
    return function (dispatch) {
        db.collection("videos")
            .doc(id)
            .get()
            .then(res => dispatch(fetchVideoSucceded(res.data())))
            .catch(err => dispatch(setAlertOn('error', err.message)));
    }
}
