import { allSEO } from "../../utils/allSEO";
import SEO from "../SEO";
import "./PageNotFound.css";

export default function PageNotFound() {
    return (
        <>
            <SEO data={allSEO.pagenotfound} />
            <h1>Error 404: Page not found</h1>
        </>
    );
}
