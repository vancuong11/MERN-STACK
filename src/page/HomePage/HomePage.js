import SliderComponent from '../../components/SliderComponent/SliderComponent';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import './HomePage.scss';
import slider1 from '../../../src/assets/images/slider1.png';
import slider2 from '../../../src/assets/images/slider2.png';
import slider3 from '../../../src/assets/images/slider3.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

function HomePage() {
    const arr = ['TV', 'Tủ Lạnh', 'Laptop', 'Điện Thoại'];
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
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                    <CardComponent />
                </div>
                <div className="btn-see-more">
                    <ButtonComponent textButton="Xem thêm" size="large" />
                </div>
            </div>
        </>
    );
}

export default HomePage;
