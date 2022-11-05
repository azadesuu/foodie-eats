import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./Theme.css";

import { useContext, useEffect, useState } from "react";
import { changeTheme, getProfile } from "../../api";
import { UserContext } from "../../actions/UserContext";
import { CircularProgress } from "@mui/material";
import { useQuery } from "react-query";

import Blueberry from "../../assets/images/Blueberry.svg";
import Boring from "../../assets/images/Boring.svg";
import Dragonfruit from "../../assets/images/Dragonfruit.svg";
import HoneyDew from "../../assets/images/HoneyDew.svg";
import Shokupan from "../../assets/images/Shokupan.svg";

import Avatar from "@mui/material/Avatar";

function TopUser(props) {
    const userProfile = props.user;

    return (
        <div className="top-user">
            <div className="top-user-r1">
                <Avatar
                    alt="user-profile-image"
                    src={
                        userProfile.profileImage !== ""
                            ? userProfile.profileImage
                            : null
                    }
                    sx={{ height: 130, width: 130 }}
                />
                <div className="top-user-info">
                    <h2>{userProfile.username}</h2>
                    <p>{userProfile.bio}</p>
                </div>
            </div>
            <div className="top-user-rev">
                <p>
                    <span className="detail">7</span> reviews
                </p>
                <p>
                    <span className="detail">10k</span> likes
                </p>
            </div>
        </div>
    );
}

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

    useEffect(() => {
        if (user && !userId) {
            setUserId(user._id);
            setCurrTheme(user.theme);
        }
    }, [user]);
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
                alert("An error occured. Please try again.");
            } else {
                alert(`Theme changed from ${oldUser.theme} to ${theme}.`);
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
                        <img id="honeydew" src={HoneyDew} />
                    </div>
                    <div
                        id="dragonfruit"
                        className={toggleActiveTheme("dragonfruit")}
                        value="dragonfruit"
                        onClick={() => updateTheme("dragonfruit")}
                    >
                        <img id="dragonfruit" src={Dragonfruit} />
                    </div>
                    <div
                        id="shokupan"
                        className={toggleActiveTheme("shokupan")}
                        value="shokupan"
                        onClick={() => updateTheme("shokupan")}
                    >
                        <img id="shokupan" src={Shokupan} />
                    </div>
                    <div
                        id="boring"
                        className={toggleActiveTheme("boring")}
                        value="boring"
                        onClick={() => updateTheme("boring")}
                    >
                        <img id="boring" src={Boring} />
                    </div>
                    <div
                        id="blueberry"
                        className={toggleActiveTheme("blueberry")}
                        value="blueberry"
                        onClick={() => updateTheme("blueberry")}
                    >
                        <img id="blueberry" src={Blueberry} />
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default function Theme() {
    const [user] = useContext(UserContext);
    const { data: userProfile, isLoading } = useQuery(
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
