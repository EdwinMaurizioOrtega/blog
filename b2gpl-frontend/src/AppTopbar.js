import React, { useEffect, useState } from 'react';
import { Link, Route, useNavigate, useLocation } from 'react-router-dom';
import AppMenu from './AppMenu';
import { classNames } from 'primereact/utils';

import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';
import * as actionType from './constants/actionTypes';

const AppTopbar = (props) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();

    const logout = () => {
        dispatch({ type: actionType.LOGOUT });

        navigate('/');

        setUser(null);

        window.location.reload(false);
    };

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    return (
        <>
            <div className="layout-topbar">
                <div className="layout-topbar-left">
                    <button className="topbar-menu-button p-link" onClick={props.onMenuButtonClick}>
                        <i className="pi pi-bars"></i>
                    </button>

                    <button className="logo p-link" onClick={() => navigate('/')}>
                        <img src={`assets/layout/images/logo-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} alt="logo" />
                    </button>

                    <button className="p-link" onClick={() => navigate('/')}>
                        <img src={`assets/layout/images/appname-${props.colorScheme === 'light' ? 'dark' : 'light'}.png`} className="app-name" alt="app-name" />
                    </button>
                </div>

                {/* <AppMenu
                    model={props.items}
                    menuMode={props.menuMode}
                    colorScheme={props.colorScheme}
                    menuActive={props.menuActive}
                    activeInlineProfile={props.activeInlineProfile}
                    onSidebarMouseOver={props.onSidebarMouseOver}
                    onSidebarMouseLeave={props.onSidebarMouseLeave}
                    toggleMenu={props.onToggleMenu}
                    onChangeActiveInlineMenu={props.onChangeActiveInlineMenu}
                    onMenuClick={props.onMenuClick}
                    onRootMenuItemClick={props.onRootMenuItemClick}
                    onMenuItemClick={props.onMenuItemClick}
                /> */}

                <div className="layout-topbar-right">
                    <ul className="layout-topbar-right-items">
                        {user?.result ? (
                            <div>
                                <span variant="h6">{user?.result.name}</span>
                                <button className="topbar-menu-button p-link" onClick={logout}>
                                    <i className="pi pi-fw pi-sign-out"></i>Logout
                                </button>
                            </div>
                        ) : (
                            <li className="p-link">
                                <Link to={'/login'} style={{ width: 'unset' }}>
                                    <i className="pi pi-fw pi-sign-out"></i>
                                    Sign In
                                </Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AppTopbar;
