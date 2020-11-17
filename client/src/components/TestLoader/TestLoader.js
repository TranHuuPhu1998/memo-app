import React, { useState, useEffect } from "react"
import ContentLoader from "react-content-loader"
import './ContentLoader.css'

export default (props) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // almost same as componentDidMount
        const loading = setTimeout(() => { setLoading(false) }, 1000);
        return () => {
            // almost same as componentWillUnmount
            clearTimeout(loading);
        };
    });
    // const timer = () => setTimeout(() => {
    //     setLoading(true)
    // }, 1000);
    return (

        loading ? (
            <ContentLoader
                className="contentLoader"
                speed={4}
                width={450}
                height={600}
                viewBox="0 0 400 475"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
            >
                <rect x="0" y="0" rx="0" ry="0" width="440" height="4" />
                <rect x="0" y="10" rx="0" ry="0" width="440" height="40" />

                <rect x="0" y="60" rx="0" ry="0" width="440" height="4" />
                <rect x="0" y="70" rx="0" ry="0" width="440" height="40" />

                <rect x="0" y="120" rx="0" ry="0" width="440" height="4" />
                <rect x="0" y="130" rx="0" ry="0" width="440" height="40" />

                <rect x="0" y="180" rx="0" ry="0" width="440" height="4" />
                <rect x="0" y="190" rx="0" ry="0" width="440" height="40" />

                <rect x="0" y="240" rx="0" ry="0" width="440" height="4" />
                <rect x="0" y="250" rx="0" ry="0" width="440" height="40" />

                <rect x="0" y="320" rx="0" ry="0" width="440" height="4" />
                <rect x="0" y="330" rx="0" ry="0" width="440" height="40" />

                <rect x="0" y="380" rx="0" ry="0" width="440" height="4" />
                <rect x="0" y="390" rx="0" ry="0" width="440" height="40" />

                <rect x="0" y="440" rx="0" ry="0" width="440" height="4" />
                <rect x="0" y="450" rx="0" ry="0" width="440" height="40" />
            </ContentLoader>
        ) : ""
    )
}


