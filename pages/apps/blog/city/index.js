import React from "react";
import AppConfig from "../../../../layout/AppConfig";
import CustomHeader from "../../../../demo/components/UserHeader/CustomHeader";
import CreatorOrTag from "../../../../demo/components/CreatorOrTag";
import SearchCity from "../../../../demo/components/SearchCity";
import TopBanner from "../../../../demo/components/TopBanner";
import Head from "next/head";

function City() {


    return (
        <>
            <Head>
                <title>Ciudad</title>
            </Head>
            <div className="landing-wrapper">
                <CustomHeader/>

                <SearchCity/>

                <TopBanner/>
                <CreatorOrTag/>
            </div>
        </>

    );

}


City.getLayout = function getLayout(page) {
    return (
        <React.Fragment>
            {page}
            <AppConfig minimal/>
        </React.Fragment>
    );
};

export default City;
