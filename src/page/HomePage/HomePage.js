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
import { useState } from 'react';

function HomePage() {
    const arr = ['TV', 'Tủ Lạnh', 'Laptop', 'Điện Thoại'];
    const [products, setProducts] = useState([]);
    const fetchProductAll = async () => {
        const res = await productService.getAllProduct();
        setProducts(res.data);
        return res;
    };
    const { isLoading, data } = useQuery(['products'], fetchProductAll, { retry: 3, retryDelay: 1000 });

    return (
        <>
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
        </>
    );
}

export default HomePage;
