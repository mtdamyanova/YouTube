import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import './App.scss';
import './reset.css';
import HomeIcon from '@material-ui/icons/Home';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import VideoLibraryIcon from '@material-ui/icons/VideoLibrary';
import HistoryIcon from '@material-ui/icons/History';
import SignUp from './Components/SignUp/SignUp';
import ErrorPage from './Components/ErrorPage/ErrorPage';
import VideoCard from './Components/VideoCard/VideoCard';
import Header from './Components/Header/Header';
import Sidebar from './Components/Sidebar/Sidebar';
import OpenVideo from './Components/OpenVideo/OpenVideo';
import SignIn from "./Components/SignIn/SignIn";
import ResetPassword from './Components/ResetPassword/ResetPassword';
import SignOut from "./Components/SignOut/SignOut";
import UploadVideo from './Components/UploadVideo/UploadVideo';
import { isLoggedIn } from './utils';
import { getAllVideos } from './service';
import image from './Components/Search/no-search-result.png';
import Search from "./Components/Search/Search";
import UserProfile from "./Components/UserProfile/UserProfile";

export default function App() {
  // CHECK IF LOGGED IN
  // this is not working...
  const [isLogged, setLogged] = useState(null);
  useEffect(() => {
    if (isLoggedIn()) {
      setLogged(true);
    } else {
      setLogged(false);
    }

    return () => {
      setLogged(null);
    };
  }, [isLogged]);

  // videos fetch call
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    getAllVideos().then((result) => setVideos(result));
  }, []);

  // HEADER & SIDEBAR
  const [sidebar, setSidebar] = useState(false);
  const handleToggerSidebar = () => {
    setSidebar(value => !value);
  }

  const header = <Header handleToggerSidebar={handleToggerSidebar} sidebar={sidebar} />;
  const sideBarContainer = (<>
    <Sidebar sidebar={sidebar} Icon={HomeIcon} type={'Home'} />
    <Sidebar sidebar={sidebar} Icon={WhatshotIcon} type={'Trending'} />
    <Sidebar sidebar={sidebar} Icon={VideoLibraryIcon} type={'Library'} />
    <Sidebar sidebar={sidebar} Icon={HistoryIcon} type={'History'} />
  </>)

  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/">
            {header}
            <div className='mainContainer'>
              <div className='sideContainer'>
                <div className={sidebar ? 'open' : 'close'}>
                  {sideBarContainer}
                </div>
              </div>
              <div className={!sidebar ? 'videoContainer' : 'notActive'}>
                {videos.length ? videos.map(video => (
                  <Link to={`/video/${video.id}`} className='link' key={video.id}>
                    <div>
                      <VideoCard url={video.url} title={video.title} duration={video.duration} views={video.views} />
                    </div>
                  </Link>
                )) : <img src={image} alt='No search results' id='noSearchResImg' />}
              </div>
            </div>
          </Route>
          <Route path="/video/:id">
            {header}

            <div className={sidebar ? 'open' : 'notVisible'}>
              {sideBarContainer}
            </div>
            <OpenVideo sidebar={sidebar} />

          </Route>
          <Route exact path="/search/">
            <Redirect to="/" />
          </Route>
          <Route path="/search/:id">
            {header}
            <Search sidebar={sidebar} sideBarContainer={sideBarContainer} />
          </Route>
          <Route exact path="/upload">
            <UploadVideo />
          </Route>
          <Route path="/user/:id">
            {header}
            <UserProfile sidebar={sidebar} sideBarContainer={sideBarContainer} />
          </Route>
          <Route exact path="/signout">
            {/* {isLogged ? <SignOut /> : <Redirect to="/" />} */}
            <SignOut />
          </Route>
          <Route exact path="/signup">
            {!isLogged ? <SignUp /> : <Redirect to="/" />}
            {/* <SignUp /> */}
          </Route>
          <Route exact path="/signin">
            {!isLogged ? <SignIn /> : <Redirect to="/" />}
            {/* <SignIn /> */}
          </Route>
          <Route exact path="/reset">
            {!isLogged ? <ResetPassword /> : <Redirect to="/" />}
            {/* <ResetPassword /> */}
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
}