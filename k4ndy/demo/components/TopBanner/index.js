import {Carousel} from "primereact/carousel";
import React, {useEffect, useState} from "react";
import {Galleria} from "primereact/galleria";
import CarouselPosts from "../../service/CarouselPosts";
import {useRouter} from "next/router";
import {getPostsByCity, getPostsByCreator, getPostsBySearch} from "../../actions/posts";
import {useDispatch} from "react-redux";

const HotBanner = ({category, city}) => {

    const router = useRouter();
    const {pathname, query} = router;
    // console.log(router.query);
    const {name} = query;
    const dispatch = useDispatch();
    const history = useRouter();
    //Ejemplo sin utilizar Redux React
    const [postsInCarousel, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true); // Estado para manejar la carga

    const productService = new CarouselPosts();
    useEffect(() => {
        setIsLoading(true); // Antes de cargar los datos, establecer isLoading a true


        // if (pathname.endsWith('/city')) {
        //     // dispatch(getPostsByCity(name));
        //     productService.getCarouselPostByCity(name).then(data => setProducts(data.slice(0, 9)));
        //     // console.log("hola hola");
        //
        //     setIsLoading(false); // En caso de error, también debes establecer isLoading a false
        //
        // } else {

        console.log("category, city: "+category, city)

            productService.getPostsInCarousel(category, city).then(data => setProducts(data.slice(0, 9)));

        setIsLoading(false); // En caso de error, también debes establecer isLoading a false

        //}


    }, [category, city]); // eslint-disable-line react-hooks/exhaustive-deps

    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];

    //Ejemplo utilizar Redux React || Revisar inconvenientes.
    // const {postsInCarousel, isLoading} = useSelector((state) => state.posts);
    // console.log("1 "+postsInCarousel);

    // useEffect(() => {
    //     dispatch(getPostsInCarousel());
    // }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const galleriaResponsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 5
        },
        {
            breakpoint: '960px',
            numVisible: 4
        },
        {
            breakpoint: '768px',
            numVisible: 3
        },
        {
            breakpoint: '560px',
            numVisible: 1
        }
    ];
    const galleriaItemTemplate = (item) => <img src={item} style={{width: '100%', display: 'block'}}/>;


    const openPost = (e) => {
        //dispatch(getPost(post._id, history));
        console.log(e._id);
        history.push(`/${e.category}/${e.city}/${e._id}`);
    };

    //Número de teléfono WhatsApp
    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };


    const productTemplate = (postsInCarousel) => {
        return (

                <div className="m-1 text-center py-5">
                    <div className="mb-3" onClick={() => openPost(postsInCarousel)}>
                        {/*<img src={`images/product/${product.image}`} onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={product.name} className="product-image" />*/}
                        <Galleria value={postsInCarousel.selected_file.map((pic) => (pic.file_url))}
                                  responsiveOptions={galleriaResponsiveOptions} numVisible={10} circular
                                  style={{maxWidth: '800px', margin: 'auto'}} item={galleriaItemTemplate} autoPlay
                                  transitionInterval={2000} showThumbnails={false}
                                  showIndicators></Galleria>

                    </div>
                    <div>
                        {/*<h4 className="mb-1">{posts.title}</h4>*/}
                        <span
                            className="inline-flex align-items-center py-2 px-3 font-medium border-1 surface-border border-round">
                            <i className="pi pi-whatsapp mr-2"></i>
                            <span className="font-semibold"
                                  onClick={() => openInNewTab(`https://wa.me/593${postsInCarousel.cellphone}?text=Hola, acabo de ver tu anuncio en K4ndy, "${postsInCarousel.title.substring(0, 25)}(…)", y me gustaría quedar contigo.`)}>WhatsApp
                            </span>
                        </span>
                        <div className="text-900 font-semibold text-xl mb-3">{postsInCarousel.title}</div>
                        {/*<h6 className="mt-0 mb-3">${product.price}</h6>*/}
                        {/*<span className={`product-badge status-${product.inventoryStatus.toLowerCase()}`}>{product.inventoryStatus}</span>*/}
                        {/*<div className="car-buttons mt-5">*/}
                        {/*    <Button icon="pi pi-search" className="p-button p-button-rounded mr-2" />*/}
                        {/*    <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded mr-2" />*/}
                        {/*    <Button icon="pi pi-cog" className="p-button-help p-button-rounded" />*/}
                        {/*</div>*/}
                    </div>

            </div>
        );
    }


    return (
        <>
            {
                isLoading ? (
                    <img src={`/layout/images/5db61a9d71fa2c97ffff30c83dcaa6e5.gif`}
                         style={{
                             height: '100%',
                             display: "block",
                             marginLeft: "auto",
                             marginRight: "auto",
                             width: "50%"
                         }}/>
                ) : (
                        <Carousel value={postsInCarousel} numVisible={4} numScroll={1}
                                  responsiveOptions={responsiveOptions}
                                  itemTemplate={productTemplate}
                                  header={<h5 style={{textAlign: "center"}}>🍭K4NDY ♥️ 🍑PARÁ CUMPLIR
                                      🔥😈🍑TUS FANTASÍAS 🍭💯🍓</h5>}/>
                    )

            }
        </>
    )

}

export default HotBanner;
