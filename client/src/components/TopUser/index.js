import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import {
    deleteNewImage,
    deleteProfileImage,
    uploadNewImage,
    uploadProfileImage
} from "../../api";
import { useEffect } from "react";

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
        <div className="image-edit">
            <label>
                <input
                    type="file"
                    name="myImage"
                    onChange={event => onImageChange(event)}
                    onClick={event => {
                        event.target.files = null;
                        setPreviewImage(null);
                    }}
                    accept="image/png, image/jpg, image/jpeg"
                    required
                />
            </label>
            {previewImage ? (
                <label>
                    <img src={previewImage} height={150} />
                </label>
            ) : (
                <p>Upload your image now!</p>
            )}
            <button id="image-btn" onClick={submitHandler}>
                Confirm Upload
            </button>
            <br />
            <button
                id="image-btn"
                onClick={() => {
                    deleteProfileImageHandler(imageURL);
                }}
            >
                Remove profile picture
            </button>
        </div>
    );
};

function TopUser(props) {
    const userProfile = props.user;
    const listReviews = props.listReviews;
    const [showUpload, setShowUpload] = useState(false);
    let no_reviews = 0;
    useEffect(() => {
        no_reviews = listReviews.length;
    }, [listReviews]);

    return (
        <div className="top-user">
            <div className="top-user-r1">
                <IconButton
                    sx={{
                        transition: "all 0.3s ease-out",
                        "&:hover": {
                            boxShadow: "0 0 10px 15px rgba(0, 0, 0, 0.25) inset"
                        }
                    }}
                >
                    <Avatar
                        alt="user-profile-image"
                        src={
                            userProfile.profileImage !== ""
                                ? userProfile.profileImage
                                : null
                        }
                        sx={{
                            height: 130,
                            width: 130
                        }}
                        onClick={() => setShowUpload(!showUpload)}
                    />
                </IconButton>
                {showUpload && <ProfileImageUpload user={userProfile} />}
                {showUpload && (
                    <button
                        id="image-cancel"
                        onClick={() => setShowUpload(!showUpload)}
                    >
                        Cancel upload
                    </button>
                )}
                <div className="top-user-info">
                    <h2>{userProfile.username}</h2>
                    <p>{userProfile.bio}</p>
                </div>
            </div>
            <div className="top-user-rev">
                <p>
                    <span className="detail">{no_reviews}</span> reviews
                </p>
                <p>
                    <span className="detail">10k</span> likes
                </p>
            </div>
        </div>
    );
}

export default TopUser;
