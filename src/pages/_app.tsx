import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import { AppProps } from 'next/app';
import Head from "next/head";
import Router, { useRouter } from "next/router";
import { appWithTranslation } from 'next-i18next';

import PageChange from "common/components/PageChange/PageChange";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "styles/tailwind.css";

interface CustomAppProps extends Omit<AppProps, "Component"> {
  Component: AppProps["Component"] & { layout: React.FC<any> };
}

type FCProps = { children: React.ReactNode };

const MyApp: React.FC<AppProps> = (props) => {

  const { Component, pageProps, } = props as CustomAppProps;
  const Layout = Component.layout || (({ children }: FCProps) => <>{children}</>);
  const { locale } = useRouter();

  useEffect(() => {
    let dir = locale === "ar" ? "rtl" : "ltr";
    let _html = document.querySelector("html")!;
    if (_html.getAttribute("dir") !== dir)
      _html.setAttribute("dir", dir);
  }, [locale]);

  return <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, shrink-to-fit=no"
      />
      <title> NextJS POC Project</title>
    </Head>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
}

export default appWithTranslation(MyApp)


Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  document.body.classList.add("body-page-transition");
  ReactDOM.render(
    <PageChange path={url} />,
    document.getElementById("page-transition")
  );
});
Router.events.on("routeChangeComplete", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition")!);
  document.body.classList.remove("body-page-transition");
});
Router.events.on("routeChangeError", () => {
  ReactDOM.unmountComponentAtNode(document.getElementById("page-transition")!);
  document.body.classList.remove("body-page-transition");
});