import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./Theme.css";
import TopUser from "../TopUser";

import { useContext, useEffect, useState } from "react";
import { changeTheme, getProfile } from "../../api";
import { UserContext } from "../../actions/UserContext";
import { CircularProgress, Alert } from "@mui/material";
import { useQuery } from "react-query";

import Blueberry from "../../assets/images/Blueberry.svg";
import Boring from "../../assets/images/Boring.svg";
import Dragonfruit from "../../assets/images/Dragonfruit.svg";
import HoneyDew from "../../assets/images/HoneyDew.svg";
import Shokupan from "../../assets/images/Shokupan.svg";

function Sidebar() {
    return (
        <div className="sidebar-content">
            <a href="my-profile">profile</a>
            <a href="my-reviews">reviews</a>
            <a href="my-bookmarks">bookmarks</a>
            <div id="current">
                <a href="my-theme">theme</a>
            </div>
        </div>
    );
}

function MyTheme(props) {
    const user = props.user;
    const [userId, setUserId] = useState();
    const [currTheme, setCurrTheme] = useState();

    const [alertStatus, setAlertStatus] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [themeUpload, setUThemeUpload] = useState(false);

    useEffect(() => {
        if (user && !userId) {
            setUserId(user._id);
            setCurrTheme(user.theme);
        }
    }, [user, userId]);
    useEffect(() => {
        document.documentElement.className = currTheme;
    }, [currTheme]);
    const updateTheme = async theme => {
        try {
            const oldUser = await changeTheme({
                userId: userId,
                newTheme: theme
            });
            if (!oldUser) {
                setUThemeUpload(!themeUpload);
                setAlertStatus("error");
                setAlertMessage("An error occured. Please try again.");
                setTimeout(function() {
                    setUThemeUpload(false);
                }, 2000);
            } else {
                setUThemeUpload(!themeUpload);
                setAlertStatus("success");
                setAlertMessage(`Theme changed from ${oldUser.theme} to ${theme}.`);
                setTimeout(function() {
                    setUThemeUpload(false);
                }, 2000);
                setCurrTheme(theme);
                localStorage.setItem("theme", theme);
            }
        } catch (err) {
            console.log(err);
        }
    };
    function toggleActiveTheme(theme) {
        if (theme === currTheme) {
            return "active-theme";
        } else {
            return "inactive-theme";
        }
    }

    return (
        <div>
            {userId ? (
                <div className="themes">
                    <div
                        id="honeydew"
                        className={toggleActiveTheme("honeydew")}
                        value="honeydew"
                        onClick={() => updateTheme("honeydew")}
                    >
                        <img id="honeydew" src={HoneyDew} alt="honeydew" />
                    </div>
                    <div
                        id="dragonfruit"
                        className={toggleActiveTheme("dragonfruit")}
                        value="dragonfruit"
                        onClick={() => updateTheme("dragonfruit")}
                    >
                        <img
                            id="dragonfruit"
                            src={Dragonfruit}
                            alt="dragonfruit"
                        />
                    </div>
                    <div
                        id="shokupan"
                        className={toggleActiveTheme("shokupan")}
                        value="shokupan"
                        onClick={() => updateTheme("shokupan")}
                    >
                        <img id="shokupan" src={Shokupan} alt="shokupan" />
                    </div>
                    <div
                        id="boring"
                        className={toggleActiveTheme("boring")}
                        value="boring"
                        onClick={() => updateTheme("boring")}
                    >
                        <img id="boring" src={Boring} alt="boring" />
                    </div>
                    <div
                        id="blueberry"
                        className={toggleActiveTheme("blueberry")}
                        value="blueberry"
                        onClick={() => updateTheme("blueberry")}
                    >
                        <img id="blueberry" src={Blueberry} alt="blueberry" />
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
            {themeUpload ? (
                <Alert
                    severity={alertStatus}
                    sx={{
                        mt: "20px"
                    }}
                >
                    {alertMessage}
                </Alert>
            ) : (
                <></>
            )}
        </div>
    );
}

export default function Theme() {
    const [user] = useContext(UserContext);
    const { data: userProfile } = useQuery(
        "profile-theme",
        () => getProfile(user?.username),
        { enabled: !!user }
    );
    return (
        <div className="content-Theme">
            <SEO data={allSEO.mytheme} />
            {userProfile ? (
                <>
                    <span className="smallScreen-Theme">
                        <h1>THEME</h1>
                        <MyTheme user={userProfile} />
                    </span>
                    <span className="bigScreen-Theme">
                        <TopUser user={userProfile} />
                        <div className="line5" />
                        <div className="r1">
                            <Sidebar />
                            <div className="r3">
                                <div className="line6" />
                                <div className="c1">
                                    <h2>theme</h2>
                                    <MyTheme user={userProfile} />
                                </div>
                            </div>
                        </div>
                    </span>
                </>
            ) : (
                <CircularProgress className="spinner" />
            )}
        </div>
    );
}
