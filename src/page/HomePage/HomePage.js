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
    const [typeProduct, setTypeProduct] = useState([]);
    const [stateProduct, setStateProduct] = useState([]);
    const [loading, setLoading] = useState(false);
    const refSearch = useRef(false);
    const [limit, setLimit] = useState(6);

    const searchProduct = useSelector((state) => state.product.search);
    const searchDebounce = useDebounce(searchProduct, 1000);

    const fetchProductAll = async (context) => {
        const limit = context.queryKey && context.queryKey[1];
        if (!limit) {
            return undefined;
        }
        const search = context.queryKey && context.queryKey[2];
        const res = await productService.getAllProduct(search, limit);
        return res;
    };

    const fetchAllTypeProduct = async () => {
        const res = await productService.getAllTypeProduct();
        setTypeProduct(res.data);
    };
    useEffect(() => {
        fetchAllTypeProduct();
    }, []);

    const {
        isLoading,
        data: products,
        isPreviousData,
    } = useQuery(['products', limit, searchDebounce], fetchProductAll, {
        retry: 3,
        retryDelay: 1000,
        keepPreviousData: true,
    });

    return (
        <Loading isLoading={isLoading || loading}>
            <div className="wrapper-homepage">
                {typeProduct.map((item) => {
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
                    {products?.data?.map((product) => {
                        return <CardComponent key={product._id} item={product} />;
                    })}
                </div>
                <div className="btn-see-more">
                    <ButtonComponent
                        textButton={isPreviousData ? 'Load more' : 'Xem thêm'}
                        size="large"
                        onClick={() => setLimit((prev) => prev + 6)}
                        disabled={products?.total === products?.data?.length || products?.totalPage === 1}
                    />
                </div>
            </div>
        </Loading>
    );
}

export default HomePage;
