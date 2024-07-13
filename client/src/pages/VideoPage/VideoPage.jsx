import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { addToHistory } from '../../actions/History';
import { getPoints, updatePoints } from '../../actions/user';
import { viewVideo } from '../../actions/video';
import Comments from "../../components/Comments/Comments";
// import { makeToast } from "../../utils/helper";
import LikeWatchLaterSaveBtns from "./LikeWatchLaterSaveBtns";
import "./VideoPage.css";

function VideoPage() {
    const { vid } = useParams();
    const dispatch = useDispatch();
    const CurrentUser = useSelector((state) => state.currentUserReducer);
    const chanels = useSelector((state) => state.chanelReducers);
    const currentChanel = chanels.filter((c) => c._id === vid)[0];
    const vids = useSelector(state => state.videoReducer);
    const vv = vids?.data.filter((q) => q._id === vid)[0];

    // const handleHistory = () => {
    //     dispatch(addToHistory({ videoId: vid, Viewer: CurrentUser?.result._id }));
    // };

    // const handleViews = () => {
    //     dispatch(viewVideo({ id: vid }));
    // };

    // useEffect(() => {
    //     if (CurrentUser) {
    //         handleHistory();
    //         dispatch(updatePoints(CurrentUser.result._id, 5)); // Add 5 points
    //         makeToast('You earned 5 points for watching this video!');
    //     }
    //     handleViews();
    // }, []);

    // useEffect(() => {
    //     if (CurrentUser) {
    //         dispatch(getPoints(CurrentUser.result._id));
    //     }
    // }, [CurrentUser]);

    useEffect(() => {
        if (CurrentUser) {
            // Add to history and update points only once
            handleHistoryAndPoints();
        }
        handleViews();
    }, []);

    useEffect(() => {
        if (CurrentUser) {
            dispatch(getPoints(CurrentUser.result._id));
        }
    }, [CurrentUser]);

    const handleHistoryAndPoints =async  () => {
        // await makeToast('You earned 5 points for watching this video!'); // Display toast notification
        dispatch(addToHistory({ videoId: vid, Viewer: CurrentUser?.result._id }));
        dispatch(updatePoints(CurrentUser.result._id, 5)).then(() => {
        });
    };

    const handleViews = () => {
        dispatch(viewVideo({ id: vid }));
    };

    return (
        <>
            <div className="container_videoPage">
                <div className="container2_videoPage">
                    <div className="video_display_screen_videoPage">
                        <video
                            src={`http://localhost:5500/${vv?.filePath}`}
                            className={"video_ShowVideo_videoPage"}
                            controls
                        ></video>
                        <div className="video_details_videoPage">
                            <div className="video_btns_title_VideoPage_cont">
                                <p className="video_title_VideoPage">{vv?.videoTitle}</p>
                                <div className="views_date_btns_VideoPage">
                                    <div className="views_videoPage">
                                        {vv?.Views} views <div className="dot"></div>
                                        {moment(vv?.createdAt).fromNow()}
                                    </div>
                                    <LikeWatchLaterSaveBtns vv={vv} vid={vid} />
                                </div>
                            </div>
                            <Link to={`/chanel/${vv?.videoChanel}`} className="chanel_details_videoPage">
                                <b className="chanel_logo_videoPage">
                                    <p>{vv?.Uploader}</p>
                                </b>
                                <p className="chanel_name_videoPage">{vv?.Uploader}</p>
                            </Link>
                            <div className="comments_VideoPage">
                                <h2><u>Coments</u></h2>
                                <Comments videoId={vv._id} />
                            </div>
                        </div>
                    </div>
                    <div className="moreVideoBar">More video</div>
                </div>
            </div>
        </>
    );
}

export default VideoPage;
