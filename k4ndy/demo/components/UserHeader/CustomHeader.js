import {StyleClass} from "primereact/styleclass";
import {Ripple} from "primereact/ripple";
import {Button} from "primereact/button";
import React, {useContext, useEffect, useRef, useState} from "react";
import * as actionType from "../../constants/actionTypes";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";


function CustomHeader() {

    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const menuRef = useRef();
    const history = useRouter();


    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('profile'));
        setUser(data);
    }, []);

    const logout = () => {
        dispatch({type: actionType.LOGOUT});

        history.push('/');

        setUser(null);

        window.location.reload(false);
    };

    return (

        <div
            className="flex align-items-center justify-content-between relative lg:static py-6 px-4 mx-0 md:px-7 lg:px-8 lg:py-6 lg:mx-8">

            {/* @see https://github.com/vercel/next.js/commit/489e65ed98544e69b0afd7e0cfc3f9f6c2b803b7 */}
            <a className="cursor-pointer">
                {/*<svg width="124" height="22" viewBox="0 0 124 22" fill="none"*/}
                {/*     xmlns="http://www.w3.org/2000/svg">*/}
                {/*    <path*/}
                {/*        d="M10.4851 0L0 20.9465H3.53702L10.4856 6.07843L17.2944 20.9465H20.9715L10.4851 0Z"*/}
                {/*        fill="var(--primary-color)"/>*/}
                {/*    <path d="M13.84 15.7927L16.2077 21.0016H11.7682L13.84 15.7927Z"*/}
                {/*          fill="var(--primary-color)"/>*/}
                {/*    <path d="M9.04645 21.0016L6.67875 15.7927L4.60701 21.0016H9.04645Z"*/}
                {/*          fill="var(--primary-color)"/>*/}
                {/*    <path*/}
                {/*        d="M40.9033 14.5217H34.771L33.1753 18.0007H30.8467L37.9346 2.77661L44.772 18.0007H42.4062L40.9033 14.5217ZM40.022 12.49L37.8975 7.61938L35.6709 12.49H40.022Z"*/}
                {/*        fill="var(--primary-color)"/>*/}
                {/*    <path*/}
                {/*        d="M52.4927 12.1838V18.0007H50.3311V3.67651H52.7803C53.9802 3.67651 54.8862 3.76001 55.4985 3.927C56.117 4.09399 56.6613 4.40942 57.1314 4.87329C57.954 5.67733 58.3652 6.69165 58.3652 7.91626C58.3652 9.22746 57.9261 10.2665 57.0479 11.0334C56.1696 11.8004 54.9852 12.1838 53.4946 12.1838H52.4927ZM52.4927 10.1799H53.2998C55.2852 10.1799 56.2778 9.4161 56.2778 7.88843C56.2778 6.41024 55.2542 5.67114 53.207 5.67114H52.4927V10.1799Z"*/}
                {/*        fill="var(--primary-color)"*/}
                {/*    />*/}
                {/*    <path*/}
                {/*        d="M63.6367 10.7737C63.6367 8.75741 64.3758 7.02563 65.854 5.57837C67.326 4.1311 69.0949 3.40747 71.1607 3.40747C73.2017 3.40747 74.952 4.13729 76.4116 5.59692C77.8775 7.05656 78.6104 8.80998 78.6104 10.8572C78.6104 12.9167 77.8744 14.664 76.4024 16.0989C74.9242 17.54 73.1398 18.2605 71.0493 18.2605C69.2001 18.2605 67.5394 17.6204 66.0674 16.3401C64.447 14.9237 63.6367 13.0683 63.6367 10.7737ZM65.8169 10.8015C65.8169 12.3848 66.3488 13.6868 67.4126 14.7073C68.4702 15.7278 69.6918 16.238 71.0772 16.238C72.5801 16.238 73.848 15.7185 74.8809 14.6794C75.9138 13.628 76.4302 12.3477 76.4302 10.8386C76.4302 9.31095 75.9199 8.03068 74.8994 6.9978C73.8851 5.95874 72.6296 5.43921 71.1328 5.43921C69.6423 5.43921 68.3836 5.95874 67.357 6.9978C66.3303 8.0245 65.8169 9.2924 65.8169 10.8015Z"*/}
                {/*        fill="var(--primary-color)"*/}
                {/*    />*/}
                {/*    <path d="M87.2495 3.67651V15.969H91.4615V18.0007H85.0879V3.67651H87.2495Z"*/}
                {/*          fill="var(--primary-color)"/>*/}
                {/*    <path d="M99.4327 3.67651V15.969H103.645V18.0007H97.271V3.67651H99.4327Z"*/}
                {/*          fill="var(--primary-color)"/>*/}
                {/*    <path*/}
                {/*        d="M108.146 10.7737C108.146 8.75741 108.885 7.02563 110.363 5.57837C111.835 4.1311 113.604 3.40747 115.67 3.40747C117.711 3.40747 119.461 4.13729 120.921 5.59692C122.387 7.05656 123.12 8.80998 123.12 10.8572C123.12 12.9167 122.384 14.664 120.912 16.0989C119.433 17.54 117.649 18.2605 115.559 18.2605C113.709 18.2605 112.049 17.6204 110.577 16.3401C108.956 14.9237 108.146 13.0683 108.146 10.7737ZM110.326 10.8015C110.326 12.3848 110.858 13.6868 111.922 14.7073C112.98 15.7278 114.201 16.238 115.586 16.238C117.089 16.238 118.357 15.7185 119.39 14.6794C120.423 13.628 120.94 12.3477 120.94 10.8386C120.94 9.31095 120.429 8.03068 119.409 6.9978C118.394 5.95874 117.139 5.43921 115.642 5.43921C114.152 5.43921 112.893 5.95874 111.866 6.9978C110.84 8.0245 110.326 9.2924 110.326 10.8015Z"*/}
                {/*        fill="var(--primary-color)"*/}
                {/*    />*/}
                {/*</svg>*/}



                <img src={`../../../layout/images/logo-k4ndy.png`} style={{height: '40px'}} alt="app-name" />

            </a>

            <StyleClass nodeRef={menuRef} selector="@next" enterClassName="hidden" leaveToClassName="hidden"
                        hideOnOutsideClick="true">
                <i ref={menuRef} className="pi pi-bars text-4xl cursor-pointer block md:hidden text-700"></i>
            </StyleClass>

            <div
                className="align-items-center flex-grow-1 hidden md:flex absolute md:static w-full md:px-0 z-3 shadow-2 md:shadow-none fadein"
                style={{top: '80px', right: '0%'}}>


                {user?.result ? (
                    <ul className="list-none p-3 md:p-0 m-0 ml-auto flex md:align-items-center select-none flex-column md:flex-row cursor-pointer surface-card md:surface-ground">

                        <li>
                            <a
                               className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                <span>{user?.result.name}</span>
                            </a>
                            <Ripple/>
                        </li>
                        <li>
                            <Button type="button" label="Cerrar sesión" className="m-0 mt-3 md:mt-0 md:ml-5"
                                    onClick={logout}></Button>
                        </li>
                    </ul>
                ) : (

                    <ul className="list-none p-3 md:p-0 m-0 ml-auto flex md:align-items-center select-none flex-column md:flex-row cursor-pointer surface-card md:surface-ground">

                        <li>
                            <a href="/auth/login"
                               className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                <span>Acceder</span>
                            </a>
                            <Ripple/>
                        </li>
                        <li>
                            <a href="/auth/register"
                               className="p-ripple flex m-0 md:ml-5 px-0 py-3 text-900 font-medium line-height-3">
                                <span>Registrarse</span>
                            </a>
                            <Ripple/>
                        </li>


                    </ul>
                )}
            </div>
        </div>

    )
};

export default CustomHeader;
