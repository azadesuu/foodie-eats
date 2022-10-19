import React from "react";

import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { UserContext } from "../../actions/UserContext";
import { uploadProfileImage, deleteProfileImage, getProfile } from "../../api";

export default function ImageUpload() {
    const [user] = useContext(UserContext);
    const { data: userProfile, isLoading, refetch } = useQuery(
        "profile",
        () => getProfile(user?.username),
        { enabled: !!user }
    );
    const [image, setImage] = useState({});
    const [previewImage, setPreviewImage, getPreviewImage] = useState("");

    async function submitHandler() {
        try {
            const formData = new FormData();
            formData.set("image", image);
            if (!formData.get("image")) {
                alert("Image not selected!");
            } else if (!user?._id) {
                alert("User not found!");
            } else if (image.size / 1024 / 1024 > 10) {
                alert("Image exceeds upload limit!");
            } else {
                const result = await uploadProfileImage({
                    file: formData,
                    userId: user?._id
                });
                if (result) {
                    refetch();
                    alert("Profile image was changed.");
                } else {
                    alert("error occured, profile image was not changed.");
                }
            }
        } catch (err) {
            alert(err);
        }
    }
    async function deleteHandler() {
        deleteProfileImage({ userId: user?._id });
    }

    const onImageChange = async event => {
        if (event.target.files && event.target.files[0]) {
            await setImage(event.target.files[0]);
            await setPreviewImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    return (
        <>
            {user && userProfile ? (
                <>
                    <label>
                        Your Image File
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
                    </label>
                    <button onClick={submitHandler}>Confirm</button>
                    <br />
                    <img
                        src={userProfile.profileImage}
                        width={100}
                        height={100}
                    />
                    <button onClick={deleteHandler}>Delete</button>
                </>
            ) : (
                <>Loading...</>
            )}
            :
        </>
    );
}
