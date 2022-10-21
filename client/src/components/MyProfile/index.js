import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./MyProfile.css";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../actions/UserContext";
import { CircularProgress } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import EditProfile from "../EditProfile";
import {
    getProfile,
    deleteNewImage,
    deleteProfileImage,
    uploadNewImage,
    uploadProfileImage
} from "../../api";
import { useNavigate } from "react-router";

const ProfileImageUpload = props => {
    const userProfile = props.user;
    const [image, setImage] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    const [imageURL, setImageURL] = useState(
        userProfile?.profileImage ? userProfile.profileImage : null
    );
    async function submitHandler() {
        try {
            const formData = new FormData();
            formData.set("image", image);
            if (!formData.get("image")) {
                alert("Image not selected!");
            } else if (image.size / 1024 / 1024 > 10) {
                alert("Image exceeds upload limit!");
            } else if (image) {
                if (imageURL) {
                    await deleteHandler(imageURL);
                    setImageURL(null);
                }
                await uploadNewImage({
                    file: formData
                })
                    .then(result => {
                        setImageURL(result);
                        uploadProfileImage({
                            userId: userProfile?._id,
                            url: result
                        });
                        alert("Image was uploaded!");
                    })
                    .catch(err => {
                        alert(err);
                    });
            }
        } catch (err) {
            alert(err);
        }
    }

    async function deleteHandler(url) {
        if (url !== "" || url !== undefined) {
            const deleted = await deleteNewImage({ url: url });
            if (deleted) {
                return true;
            } else {
                alert("Error occured, image was not deleted.");
            }
        }
    }
    async function deleteProfileImageHandler() {
        const deleted = await deleteHandler(userProfile.profileImage);
        const removedProfileImage = await deleteProfileImage({
            userId: userProfile._id
        });
        if (removedProfileImage) {
            return true;
        } else {
            alert("Error occured, image was not deleted.");
        }
    }

    const onImageChange = async event => {
        if (event.target.files && event.target.files[0]) {
            await setImage(event.target.files[0]);
            await setPreviewImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    return (
        <div>
            <label>
                Your Image File
                <br />
                <input
                    type="file"
                    name="myImage"
                    onChange={event => onImageChange(event)}
                    accept="image/png, image/jpg, image/jpeg"
                    required
                />
            </label>
            <label>
                <img
                    src={previewImage}
                    alt="preview image"
                    width={100}
                    height={100}
                />
                <br />
                <img
                    src={imageURL}
                    alt="uploaded image"
                    width={100}
                    height={100}
                />
            </label>
            <button onClick={submitHandler}>Confirm Upload</button>
            <br />
            <br />
            <button
                onClick={() => {
                    deleteProfileImageHandler(imageURL);
                }}
            >
                Remove Profile Picture
            </button>
        </div>
    );
};

function TopUser(props) {
    const userProfile = props.user;
    const [showUpload, setShowUpload] = useState(false);
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
                <button onClick={() => setShowUpload(!showUpload)}>Show</button>
                {showUpload && <ProfileImageUpload user={userProfile} />}
                {showUpload && (
                    <button onClick={() => setShowUpload(!showUpload)}>
                        Cancel Upload
                    </button>
                )}

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
            <div id="current">
                <a href="my-profile">profile</a>
            </div>
            <a href="my-reviews">reviews</a>
            <a href="my-bookmarks">bookmarks</a>
            <a href="my-theme">theme</a>
        </div>
    );
}

function ProfileDetails(props) {
    const userProfile = props.user;
    const navigate = useNavigate();
    const [editButton, setEditButton] = useState(false);
    const updateUser = () => {
        setEditButton(!editButton);
    };

    return (
        <div className="profile-details">
            <div className="profile-title">
                <span className="bigScreen-MyProfile">
                    <h2>profile</h2>
                </span>
                <span className="smallScreen-MyProfile">
                    <div className="r2">
                        <h1>{userProfile.username}</h1>
                        <IconButton
                            value={editButton}
                            onClick={updateUser}
                            sx={{
                                "&:hover": {
                                    bgcolor: "#FFFEEC"
                                },
                                left: "30px",
                                bottom: "40px"
                            }}
                        >
                            <EditIcon
                                sx={{
                                    color: "black",
                                    fontSize: 40,
                                    "&:hover": {
                                        bgcolor: "#FFFEEC"
                                    }
                                }}
                            />
                        </IconButton>
                    </div>
                    <Avatar
                        alt="user-profile-image"
                        src={
                            userProfile.profileImage !== ""
                                ? userProfile.profileImage
                                : null
                        }
                        sx={{
                            height: 110,
                            width: 110,
                            ml: "35px",
                            mt: "-40px"
                        }}
                    />
                </span>
                <span className="bigScreen-MyProfile">
                    <IconButton
                        value={editButton}
                        onClick={updateUser}
                        sx={{
                            "&:hover": {
                                bgcolor: "#FFFEEC"
                            },
                            bottom: "5px"
                        }}
                    >
                        <EditIcon
                            sx={{
                                color: "black",
                                fontSize: 30,
                                "&:hover": {
                                    bgcolor: "#FFFEEC"
                                }
                            }}
                        />
                    </IconButton>
                </span>
            </div>
            {!editButton ? (
                <div>
                    {userProfile ? (
                        <div>
                            <div className="form-control-profile">
                                <label>Username </label>
                                <input
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={userProfile.username}
                                    readOnly="readOnly"
                                />
                            </div>
                            <div className="form-control-profile">
                                <label>Email </label>
                                <input
                                    type="text"
                                    name="email"
                                    id="email"
                                    value={userProfile.email}
                                    readOnly="readOnly"
                                />
                            </div>
                            <div className="form-control-profile-bio">
                                <label>Bio </label>
                                <textarea
                                    type="text"
                                    name="bio"
                                    id="bio"
                                    value={userProfile.bio}
                                    readOnly="readOnly"
                                />
                            </div>
                            <span className="smallScreen-MyProfile">
                                <div className="viewallreviews">
                                    <a href="my-reviews">View all my reviews</a>
                                </div>
                            </span>
                            <div className="changepw">
                                <a href="change-password">Change Password</a>
                            </div>
                        </div>
                    ) : (
                        <div>Error</div>
                    )}
                </div>
            ) : (
                <EditProfile
                    _id={userProfile._id}
                    username={userProfile.username}
                    email={userProfile.email}
                    bio={userProfile.bio}
                    profileImage={userProfile.profileImage}
                    navigation={navigate}
                />
            )}
        </div>
    );
}

function MyProfile() {
    const [user] = useContext(UserContext);
    const { data: userProfile, isLoading } = useQuery(
        "bookmarks",
        () => getProfile(user?.username),
        { enabled: !!user }
    );
    return (
        <>
            {userProfile && !isLoading ? (
                <div className="content-MyProfile">
                    <SEO data={allSEO.myprofile} />
                    <span className="smallScreen-MyProfile">
                        <ProfileDetails user={userProfile} />
                    </span>
                    <span className="bigScreen-MyProfile">
                        <TopUser user={userProfile} />
                        <div className="line5" />
                        <div className="r1">
                            <Sidebar />
                            <div className="r3">
                                <div className="line6" />
                                <ProfileDetails user={userProfile} />
                            </div>
                        </div>
                    </span>
                </div>
            ) : (
                <CircularProgress className="spinner" />
            )}
        </>
    );
}

export default MyProfile;
