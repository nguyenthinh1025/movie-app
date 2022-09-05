
import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Route } from "react-router-dom";
import Footer from "./Layout/Footer/Footer";
import Header from "./Layout/Header/Header";
import HomeCarousel from "./Layout/HomeCarousel/HomeCarousel";

export const HomeTemplate = (props) => {

    useEffect(() => {
        window.scrollTo(0, 0);
    });
    const { Component, ...restProps } = props;
    return <Route {...restProps} render={(propsRoute) => {

        return <Fragment>
            <Header {...propsRoute} />

            <Component {...propsRoute} />

            <Footer />
        </Fragment>
    }} />
}