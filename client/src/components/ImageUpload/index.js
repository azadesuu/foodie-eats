import React from "react";

import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { UserContext } from "../../actions/UserContext";
import {
    uploadProfileImage,
    deleteProfileImage,
    uploadReviewImage,
    deleteReviewImage
} from "../../api";

export default function ImageUpload(props) {
    const navigate = useNavigate();
    if (
        (!props.userId && !props.reviewId) ||
        (props.userId && props.reviewId)
    ) {
        navigate(-1);
    }

    const [image, setImage] = useState({});
    const [previewImage, setPreviewImage, getPreviewImage] = useState("");

    async function submitHandler() {
        try {
            const formData = new FormData();
            formData.set("image", image);
            if (!formData.get("image")) {
                alert("Image not selected!");
            } else if (image.size / 1024 / 1024 > 10) {
                alert("Image exceeds upload limit!");
            }

            if (props.userId) {
                const result = await uploadProfileImage({
                    file: formData,
                    userId: props.userId
                });
                if (result) {
                    alert("Profile image was changed.");
                } else {
                    alert("error occured, profile image was not changed.");
                }
            } else {
                const result = await uploadReviewImage({
                    file: formData,
                    reviewId: props.reviewId
                });
                if (result) {
                    alert("Review image was changed.");
                } else {
                    alert("Error occured, review image was not changed.");
                }
            }
        } catch (err) {
            alert(err);
        }
    }
    async function deleteHandler() {
        if (props.userId) deleteProfileImage({ userId: props.userId });
        else {
            deleteReviewImage({ reviewId: props.reviewId });
        }
    }

    const onImageChange = async event => {
        if (event.target.files && event.target.files[0]) {
            await setImage(event.target.files[0]);
            await setPreviewImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    return (
        <>
            {props.userId || props.reviewId ? (
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
                    <button onClick={submitHandler}>Confirm Upload</button>
                    <br />
                    <button onClick={deleteHandler}>Delete</button>
                </>
            ) : (
                <>Loading...</>
            )}
            :
        </>
    );
}
