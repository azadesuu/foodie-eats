import "./Theme.css";

import { useContext, useEffect, useState } from "react";
import { changeTheme } from "../../api";
import { UserContext } from "../../actions/UserContext";
import { CircularProgress } from "@mui/material";

import Blueberry from "../../assets/images/Blueberry.svg";
import Boring from "../../assets/images/Boring.svg";
import Dragonfruit from "../../assets/images/Dragonfruit.svg";
import HoneyDew from "../../assets/images/HoneyDew.svg";
import Shokupan from "../../assets/images/Shokupan.svg";

import Avatar from "@mui/material/Avatar";
import { CircularProgress } from "@mui/material";

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
    const [currTheme, setCurrTheme] = useState("honeydew");

    useEffect(() => {
        if (user && !userId) {
            setUserId(user._id);
            setCurrTheme(user.theme);
        }
    }, [user]);

    const updateTheme = async theme => {
        try {
            const oldUser = await changeTheme({
                userId: userId,
                newTheme: theme
            });
            if (!oldUser) {
                alert("An error occured. Please try again.");
            } else {
                alert(
                    `Theme changed from ${oldUser.theme} to ${theme}, re-login to save changes`
                );
                setCurrTheme(theme);
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
                    <button
                        className={toggleActiveTheme("honeydew")}
                        value="honeydew"
                        onClick={() => updateTheme("honeydew")}
                    >
                        <img id="honeydew" src={HoneyDew} />
                    </button>
                    <button
                        className={toggleActiveTheme("dragonfruit")}
                        value="dragonfruit"
                        onClick={() => updateTheme("dragonfruit")}
                    >
                        <img id="dragonfruit" src={Dragonfruit} />
                    </button>
                    <button
                        className={toggleActiveTheme("shokupan")}
                        value="shokupan"
                        onClick={() => updateTheme("shokupan")}
                    >
                        <img id="shokupan" src={Shokupan} />
                    </button>
                    <button
                        className={toggleActiveTheme("boring")}
                        value="boring"
                        onClick={() => updateTheme("boring")}
                    >
                        <img id="boring" src={Boring} />
                    </button>
                    <button
                        className={toggleActiveTheme("blueberry")}
                        value="blueberry"
                        onClick={() => updateTheme("blueberry")}
                    >
                        <img id="blueberry" src={Blueberry} />
                    </button>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default function Theme() {
    const [user] = useContext(UserContext);

    return (
        <div className="content-Theme">
            {user ? (
                <>
                    <span className="smallScreen-Theme">
                        <h1>THEME</h1>
                        <MyTheme user={user} />
                    </span>
                    <span className="bigScreen-Theme">
                        <TopUser user={user} />
                        <div className="line5" />
                        <div className="r1">
                            <Sidebar />
                            <div className="r3">
                                <div className="line6" />
                                <div className="c1">
                                    <h2>theme</h2>
                                    <MyTheme user={user} />
                                </div>
                            </div>
                        </div>
                    </span>
                </>
            ) : (
                <CircularProgress className="spinner" />
            )}
            <div className="footer">
                <p>Copyright © 2022 All-for-one</p>
            </div>
        </div>
    );
}
