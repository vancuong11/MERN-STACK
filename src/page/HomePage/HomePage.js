import SliderComponent from '../../components/SliderComponent/SliderComponent';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import './HomePage.scss';
import slider1 from '../../../src/assets/images/slider1.png';
import slider2 from '../../../src/assets/images/slider2.png';
import slider3 from '../../../src/assets/images/slider3.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useQuery } from '@tanstack/react-query';
import * as productService from '../../services/productService';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';

function HomePage() {
    const arr = ['TV', 'Tủ Lạnh', 'Laptop', 'Điện Thoại'];
    const [products, setProducts] = useState([]);
    const [stateProduct, setStateProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const refSearch = useRef(false);

    const searchProduct = useSelector((state) => state.product.search);
    const searchDebounce = useDebounce(searchProduct, 1000);

    const fetchProductAll = async (search) => {
        const res = await productService.getAllProduct(search);
        if (search.length > 0 || refSearch.current) {
            setProducts(res.data);
        } else {
            return res;
        }
        setProducts(res.data);
    };

    useEffect(() => {
        if (refSearch.current) {
            setLoading(true);
            fetchProductAll(searchDebounce);
        }
        refSearch.current = true;
        setLoading(false);
    }, [searchDebounce]);

    const { isLoading, data: product } = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 });
    useEffect(() => {
        if (product?.length > 0) {
            setStateProduct(product);
        }
    }, [product]);
    return (
        <Loading isLoading={isLoading || loading}>
            <div className="wrapper-homepage">
                {arr.map((item) => {
                    return (
                        <div className="type-product" key={item}>
                            <TypeProduct name={item} />
                        </div>
                    );
                })}
            </div>
            <div className="container">
                <SliderComponent arrImages={[slider1, slider2, slider3]} />

                <div className="card-component">
                    {products.length > 0 &&
                        products.map((product) => {
                            return <CardComponent key={product._id} item={product} />;
                        })}
                </div>
                <div className="btn-see-more">
                    <ButtonComponent textButton="Xem thêm" size="large" />
                </div>
            </div>
        </Loading>
    );
}

export default HomePage;
