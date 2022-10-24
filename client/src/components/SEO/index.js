import { Helmet } from "react-helmet";
import React, { useEffect } from "react";
import { useState } from "react";

export default function SEO(props) {
    const { title, description, link } = props.data;

    const [newTitle, setTitle] = useState(title);
    const [newDesc, setDesc] = useState(description);
    const [newLink, setLink] = useState(link);

    useEffect(() => {
        if (props.username) {
            setTitle(title.replace("<username>", props.username));
            setDesc(description.replace("<username>", props.username));
            setLink(link.replace("<username>", props.username));
        }
        if (props.restaurantName) {
            setTitle(title.replace("<restaurant-name>", props.restaurantName));
        }
        if (props.id) {
            setLink(link.replace("<id>", props.id));
        }
    }, []);
    return (
        <Helmet
            htmlAttributes={{ lang: "en" }}
            title={newTitle}
            meta={[
                {
                    name: "description",
                    content: newDesc
                },
                { charSet: "utf-8" }
            ]}
            links={[
                {
                    rel: "canonical",
                    href: newLink
                }
            ]}
        />
    );
}
