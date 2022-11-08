import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import {
    deleteNewImage,
    deleteProfileImage,
    uploadNewImage,
    uploadProfileImage,
    getMyReviews
} from "../../api";
import { useQuery } from "react-query";
import { useEffect } from "react";

const ProfileImageUpload = props => {
    const userProfile = props.user;
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageURL, setImageURL] = useState(
        userProfile?.profileImage !== "" ||
            userProfile?.profileImage !== undefined
            ? userProfile.profileImage
            : null
    );
    const [alertStatus, setAlertStatus] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [deleteImg, setDeleteImg] = useState(false);
    const [uploadImg, setUploadImg] = useState(false);
    async function submitHandler() {
        try {
            const formData = new FormData();
            formData.set("image", image);
            if (!image || !formData.get("image")) {
                setUploadImg(true);
                setAlertStatus("info");
                setAlertMessage("No image selected!");
            } else if (image.size / 1024 / 1024 > 10) {
                setUploadImg(true);
                setAlertStatus("error");
                setAlertMessage("Image exceeds upload limit!");
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
            } else if (image) {
                if (imageURL) {
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
                        setUploadImg(true);
                        setAlertStatus("success");
                        setAlertMessage("Image was uploaded!");
                        setTimeout(function() {
                            window.location.reload();
                        }, 1000);
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
        if (url !== "" && url !== undefined) {
            const deleted = await deleteNewImage({ url: url });
            if (deleted) {
                setDeleteImg(true);
                setAlertStatus("success");
                setAlertMessage("Image successfully removed.");
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
                return true;
            } else {
                setDeleteImg(true);
                setAlertStatus("error");
                setAlertMessage("Error occured, image was not deleted.");
                setTimeout(function() {
                    window.location.reload();
                }, 1000);
            }
        } else {
            setDeleteImg(true);
            setAlertStatus("error");
            setAlertMessage("Image does not exist");
        }
    }
    async function deleteProfileImageHandler() {
        await deleteHandler(userProfile.profileImage);
        const removedProfileImage = await deleteProfileImage({
            userId: userProfile._id
        });
        if (removedProfileImage) {
            return true;
        } else {
            setDeleteImg(true);
            setAlertStatus("error");
            setAlertMessage("Error occured, image was not deleted.");
            setTimeout(function() {
                window.location.reload();
            }, 1000);
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
                    <img src={previewImage} alt="preview" />
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
            {deleteImg ? (
                <Alert
                    severity={alertStatus}
                    sx={{
                        mt: "5px",
                        width: "220px"
                    }}
                >
                    {alertMessage}
                </Alert>
            ) : (
                <></>
            )}
            {uploadImg ? (
                <Alert
                    severity={alertStatus}
                    sx={{
                        mt: "5px",
                        width: "220px"
                    }}
                >
                    {alertMessage}
                </Alert>
            ) : (
                <></>
            )}
        </div>
    );
};

function TopUser(props) {
    const userProfile = props.user;
    const [showUpload, setShowUpload] = useState(false);
    const [numReviews, setNumReviews] = useState("..");
    const [numLikes, setNumLikes] = useState("..");

    const { data: listReviews, isLoading } = useQuery(
        "my-reviews",
        () => getMyReviews(userProfile?._id),
        {
            enabled: !!userProfile
        }
    );

    useEffect(() => {
        if (isLoading === false && listReviews) {
            setNumReviews(listReviews.length);
            let total = 0;
            let i = 0;
            for (i = 0; i < listReviews.length; i++) {
                total += listReviews[i].likeCount;
            }
            setNumLikes(total);
        }
    }, [isLoading, listReviews]);

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
                    onClick={() => setShowUpload(!showUpload)}
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
                    />
                </IconButton>
                {showUpload && <ProfileImageUpload user={userProfile} />}
                {showUpload && (
                    <button
                        id="image-cancel"
                        onClick={() => setShowUpload(!showUpload)}
                    >
                        x
                    </button>
                )}
                <div className="top-user-info">
                    <h2>{userProfile.username}</h2>
                    <p>{userProfile.bio}</p>
                </div>
            </div>
            <div className="top-user-rev">
                <p>
                    <span className="detail">
                        {!isLoading ? numReviews : `..`}
                    </span>{" "}
                    reviews
                </p>
                <p>
                    <span className="detail">
                        {!isLoading ? numLikes : `..`}
                    </span>{" "}
                    likes
                </p>
            </div>
        </div>
    );
}

export default TopUser;
