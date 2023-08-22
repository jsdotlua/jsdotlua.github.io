import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.heroTitle)}>
          JS<span className={styles.heroMono}>.Lua</span>
        </h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            Get Started 👉
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="The home of JS.Lua, a collection of Lua packages translated from JavaScript."
    >
      <HomepageHeader />
      <main className="container margin-vert--lg">
        <div className="container">
          <div className="row">
            <div className="col col--2"></div>
            <div className="col col--8 text--center">
              <div className="row row--align-center">
                <h1
                  className="text--center margin-vert--lg"
                  style={{ width: "100%" }}
                >
                  What is JS.Lua?
                </h1>
                <p
                  style={{
                    fontSize: "1.125rem",
                    lineHeight: "1.75rem",
                  }}
                >
                  Most packages in this repository stem from Roblox's work
                  translating common JavaScript packages to Luau. This project
                  aims to keep Roblox's translated packages maintained in the
                  open for all to use. Many packages maintained here are largely
                  runtime-agnostic, and can run in any environment (with some
                  elbow grease). They aren't just tied to Roblox!
                </p>
              </div>
            </div>
            <div className="col col--2"></div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
