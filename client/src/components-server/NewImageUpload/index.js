import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { deleteNewImage, uploadNewImage } from "../../api";

export default function NewImageUpload() {
    const navigate = useNavigate();
    const [previousImage, setPreviousImage] = useState({});
    const [image, setImage] = useState({});
    const [previewImage, setPreviewImage] = useState(null);
    const [imageURL, setImageURL] = useState("");

    async function submitHandler() {
        try {
            const formData = new FormData();
            formData.set("image", image);
            if (!formData.get("image")) {
                alert("Image not selected!");
            } else if (image.size / 1024 / 1024 > 10) {
                alert("Image exceeds upload limit!");
            } else if (image) {
                if (previousImage) {
                    deleteHandler(previousImage);
                    setPreviousImage(null);
                }
                const result = await uploadNewImage({
                    file: formData
                });
                if (result) {
                    alert("Image was uploaded!");
                    setImageURL(result);
                    setPreviousImage(result);
                } else {
                    alert("Error occured, review image was not changed.");
                }
            }
        } catch (err) {
            alert(err);
        }
    }

    async function deleteHandler(url) {
        if (url) {
            const deleted = await deleteNewImage({ url: url });
            if (deleted) {
                alert("deleted");
            } else {
                alert("Error occured, image was not deleted.");
            }
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
            <button
                onClick={() => {
                    deleteHandler(imageURL);
                    setImageURL(null);
                }}
            >
                Delete Upload
            </button>
            <button onClick={() => navigate(-1)}>Cancel Upload</button>
        </div>
    );
}
