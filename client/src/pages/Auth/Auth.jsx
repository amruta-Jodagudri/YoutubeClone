import React, { useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setCurrentUser } from "../../actions/currentUser";
import { getPoints } from "../../actions/user";
import "./Auth.css";

function Auth({ User, setAuthBtn, setEditCreateChanelBtn }) {
    const dispatch = useDispatch();
    // const points = useSelector((state) => state.User?.Points);
    // const points = useSelector((state) => state.User?.result.points || 0);
    // const points = useSelector((state)=>state.userReducer);

    useEffect(() => {
        if (User) {
            dispatch(getPoints(User.result._id));
        }
    }, [User, dispatch]);

    const onLogOutSuccess = () => {
        dispatch(setCurrentUser(null));
        alert("Log Out SuccessFully");
    };

    return (
        <div className="Auth_container" onClick={() => setAuthBtn(false)}>
            <div className="Auth_container2">
                <p className="User_Details">
                    <div className="Chanel_logo_App">
                        <p className="fstChar_logo_App">
                            {User?.result.name ? (
                                <>{User?.result.name.charAt(0).toUpperCase()} </>
                            ) : (
                                <>{User?.result.email.charAt(0).toUpperCase()} </>
                            )}
                        </p>
                    </div>
                    <div className="email_Auth">{User?.result.email}</div>
                </p>
                <div className="btns_Auth">
                    {User?.result.name ? (
                        <>
                            <div>
                                <Link to={`/chanel/${User?.result._id}`} className="btn_Auth">
                                    Your Chanel
                                </Link>
                                <p>Points: {User?.result.points}</p>
                                {/* <p>Points: {points}</p> */}
                            </div>
                        </>
                    ) : (
                        <>
                            <input
                                type="submit"
                                className="btn_Auth"
                                value="Create Your Chanel"
                                onClick={() => setEditCreateChanelBtn(true)}
                            />
                        </>
                    )}
                    <div>
                        <GoogleLogout
                            clientId={
                                "154768887865-6pn0fegmtio4mj568e4tlvgk0tek6i2u.apps.googleusercontent.com"
                            }
                            onLogoutSuccess={onLogOutSuccess}
                            render={(renderProps) => (
                                <div onClick={renderProps.onClick} className="btn_Auth">
                                    <BiLogOut />
                                    Log Out
                                </div>
                            )}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;