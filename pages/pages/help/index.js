import React from 'react';
import Link from "next/link";
import Head from "next/head";

function Help() {
    return (

        <>
            <Head>
                <title>Soporte Español</title>
            </Head>
            <div>
                <div className="card">
                    <div className="relative overflow-hidden h-20rem bg-primary flex flex-column align-items-center justify-content-center border-round mb-8">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute w-full top-0 left-0">
                            <path
                                fill="var(--primary-600)"
                                fillOpacity="1"
                                d="M0,64L48,90.7C96,117,192,171,288,208C384,245,480,267,576,256C672,245,768,203,864,165.3C960,128,1056,96,1152,74.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                            ></path>
                        </svg>
                        <div className="font-bold mb-5 text-4xl z-1">¿Cómo podemos ayudar?</div>
                        {/*<span className="p-input-icon-left w-9 md:w-6">*/}
                        {/*    <i className="pi pi-search"></i>*/}
                        {/*    <InputText id="name" type="text" placeholder="Search" style={{ borderRadius: '2rem' }} className={'w-full'} />*/}
                        {/*</span>*/}
                    </div>

                    <div className="grid mb-5">
                        {/*<div className="col-12 md:col-4 mb-5">*/}
                        {/*    <div className="flex flex-column align-items-center">*/}
                        {/*        <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-primary-100 mb-5">*/}
                        {/*            <i className="pi pi-power-off text-4xl text-primary-700"></i>*/}
                        {/*        </span>*/}
                        {/*        <div className="text-2xl mb-3 font-medium">Getting Started</div>*/}
                        {/*        <ul className="list-none m-0 p-0 text-center">*/}
                        {/*            <li className="line-height-3 mb-1">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Lorem ipsum dolor</a>*/}
                        {/*            </li>*/}
                        {/*            <li className="line-height-3 mb-1">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Consectetur adipiscing elit</a>*/}
                        {/*            </li>*/}
                        {/*            <li className="line-height-3 mb-3">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Sed do eiusmod tempor</a>*/}
                        {/*            </li>*/}
                        {/*            <li>*/}
                        {/*                <a className="text-primary hover:underline cursor-pointer font-medium">View all</a>*/}
                        {/*            </li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="col-12 md:col-4 mb-5">*/}
                        {/*    <div className="flex flex-column align-items-center">*/}
                        {/*        <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-primary-100 mb-5">*/}
                        {/*            <i className="pi pi-arrows-h text-4xl text-primary-700"></i>*/}
                        {/*        </span>*/}
                        {/*        <div className="text-2xl mb-3 font-medium">Transactions</div>*/}
                        {/*        <ul className="list-none m-0 p-0 text-center">*/}
                        {/*            <li className="line-height-3 mb-1">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Lorem ipsum dolor</a>*/}
                        {/*            </li>*/}
                        {/*            <li className="line-height-3 mb-1">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Consectetur adipiscing elit</a>*/}
                        {/*            </li>*/}
                        {/*            <li className="line-height-3 mb-3">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Sed do eiusmod tempor</a>*/}
                        {/*            </li>*/}
                        {/*            <li>*/}
                        {/*                <a className="text-primary hover:underline cursor-pointer font-medium">View all</a>*/}
                        {/*            </li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="col-12 md:col-4 mb-5">
                            <div className="flex flex-column align-items-center">
                            <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-primary-100 mb-5">
                                <i className="pi pi-telegram text-4xl text-primary-700"></i>
                            </span>
                                <div className="text-2xl mb-3 font-medium">Soporte Telegram Español</div>
                                <ul className="list-none m-0 p-0 text-center">
                                    <li className="line-height-3 mb-1">
                                        <a className="text-color-secondary hover:text-primary cursor-pointer">Estimado(a) miembro,</a>
                                    </li>
                                    <li className="line-height-3 mb-1">
                                        <a className="text-color-secondary hover:text-primary cursor-pointer">Tu participación en nuestro exclusivo grupo privado de soporte en Telegram es invaluable. Te invitamos a informarnos de cualquier error que encuentres en nuestra plataforma, para poder abordarlo y mejorar la experiencia de todos. Agradecemos sinceramente tu colaboración en el crecimiento y perfeccionamiento de nuestra comunidad. </a>
                                    </li>
                                    <li className="line-height-3 mb-3">
                                        <a className="text-color-secondary hover:text-primary cursor-pointer">Con gratitud, El Equipo de Soporte K0K4</a>
                                    </li>
                                    <li>
                                        {/*<Link href="https://t.me/+ngCrW98FWCw3ZWYx">Abrir Canal</Link>*/}
                                        <Link href="https://t.me/+M6jowATvAA9iMjFh">Abrir Grupo</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        {/*<div className="col-12 md:col-4 mb-5">*/}
                        {/*    <div className="flex flex-column align-items-center">*/}
                        {/*        <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-primary-100 mb-5">*/}
                        {/*            <i className="pi pi-money-bill text-4xl text-primary-700"></i>*/}
                        {/*        </span>*/}
                        {/*        <div className="text-2xl mb-3 font-medium">Billing</div>*/}
                        {/*        <ul className="list-none m-0 p-0 text-center">*/}
                        {/*            <li className="line-height-3 mb-1">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Lorem ipsum dolor</a>*/}
                        {/*            </li>*/}
                        {/*            <li className="line-height-3 mb-1">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Consectetur adipiscing elit</a>*/}
                        {/*            </li>*/}
                        {/*            <li className="line-height-3 mb-3">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Sed do eiusmod tempor</a>*/}
                        {/*            </li>*/}
                        {/*            <li>*/}
                        {/*                <a className="text-primary hover:underline cursor-pointer font-medium">View all</a>*/}
                        {/*            </li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="col-12 md:col-4 mb-5">*/}
                        {/*    <div className="flex flex-column align-items-center">*/}
                        {/*        <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-primary-100 mb-5">*/}
                        {/*            <i className="pi pi-database text-4xl text-primary-700"></i>*/}
                        {/*        </span>*/}
                        {/*        <div className="text-2xl mb-3 font-medium">Integrations</div>*/}
                        {/*        <ul className="list-none m-0 p-0 text-center">*/}
                        {/*            <li className="line-height-3 mb-1">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Lorem ipsum dolor</a>*/}
                        {/*            </li>*/}
                        {/*            <li className="line-height-3 mb-1">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Consectetur adipiscing elit</a>*/}
                        {/*            </li>*/}
                        {/*            <li className="line-height-3 mb-3">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Sed do eiusmod tempor</a>*/}
                        {/*            </li>*/}
                        {/*            <li>*/}
                        {/*                <a className="text-primary hover:underline cursor-pointer font-medium">View all</a>*/}
                        {/*            </li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="col-12 md:col-4 mb-5">*/}
                        {/*    <div className="flex flex-column align-items-center">*/}
                        {/*        <span className="inline-flex align-items-center justify-content-center border-circle w-5rem h-5rem bg-primary-100 mb-5">*/}
                        {/*            <i className="pi pi-lock text-4xl text-primary-700"></i>*/}
                        {/*        </span>*/}
                        {/*        <div className="text-2xl mb-3 font-medium">Security</div>*/}
                        {/*        <ul className="list-none m-0 p-0 text-center">*/}
                        {/*            <li className="line-height-3 mb-1">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Lorem ipsum dolor</a>*/}
                        {/*            </li>*/}
                        {/*            <li className="line-height-3 mb-1">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Consectetur adipiscing elit</a>*/}
                        {/*            </li>*/}
                        {/*            <li className="line-height-3 mb-3">*/}
                        {/*                <a className="text-color-secondary hover:text-primary cursor-pointer">Sed do eiusmod tempor</a>*/}
                        {/*            </li>*/}
                        {/*            <li>*/}
                        {/*                <a className="text-primary hover:underline cursor-pointer font-medium">View all</a>*/}
                        {/*            </li>*/}
                        {/*        </ul>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>

        </>


);
}

export default Help;
