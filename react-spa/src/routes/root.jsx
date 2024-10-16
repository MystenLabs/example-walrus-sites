// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Outlet, Link, useLocation } from "react-router-dom";

export default function Root() {
    const location = useLocation();
    return (
        <>
            <div id="sidebar">
                <h1>Single Page Application Example</h1>
                <div>
                    <form id="search-form" role="search">
                        <input
                            id="q"
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="q"
                        />
                        <div id="search-spinner" aria-hidden hidden={true} />
                        <div className="sr-only" aria-live="polite"></div>
                    </form>
                    <form method="post">
                        <button type="submit">New</button>
                    </form>
                </div>
                <nav>
                    <ul>
                        <li>
                            <Link to={`/you`}>You</Link>
                        </li>
                        <li>
                            <Link to={`/friend`}>Friend</Link>
                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail">
                <Outlet />
                {location.pathname === "/" && (
                    <div
                        style={{
                            width: "60%",
                            margin: "0 auto",
                            padding: "20px",
                            fontFamily: "Arial, sans-serif",
                            lineHeight: "1.5",
                        }}
                    >
                        <h1 style={{ textAlign: "center", color: "#333" }}>
                            Single Page Application Example
                        </h1>
                        <p style={{ fontSize: "16px", color: "#555" }}>
                            This is an example SPA hosted on{" "}
                            <a
                                href="https://walrus.site/"
                                style={{ color: "#007BFF", textDecoration: "none" }}
                            >
                                walrus sites
                            </a>
                            ! Use the left sidebar to navigate to different routes by clicking on
                            You or Friend.
                            <br />
                            <br />
                            ⚡️ Enjoy the rapid navigation! SPAs perform client-side path
                            resolution, eliminating redundant network requests.
                            <br />
                            <br />
                            Discover how using a special file,{" "}
                            <code
                                style={{
                                    backgroundColor: "#f4f4f4",
                                    padding: "2px 4px",
                                    borderRadius: "4px",
                                }}
                            >
                                ws-resources.json
                            </code>
                            , can enable this on walrus. Learn more in our{" "}
                            <a
                                href="https://docs.walrus.site"
                                style={{ color: "#007BFF", textDecoration: "none" }}
                            >
                                docs
                            </a>
                            !
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}
