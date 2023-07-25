import SliderComponent from '../../components/SliderComponent/SliderComponent';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import './HomePage.scss';
import slider1 from '../../../src/assets/images/slider1.png';
import slider2 from '../../../src/assets/images/slider2.png';
import slider3 from '../../../src/assets/images/slider3.png';
import CardComponent from '../../components/CardComponent/CardComponent';
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent';

function HomePage() {
    const arr = ['TV', 'Tủ Lạnh', 'Laptop', 'Điện Thoại'];
    return (
        <>
            <div className="wrapper-homepage">
                {arr.map((index, item) => {
                    return (
                        <div key={index} className="type-product">
                            <TypeProduct name={item} />
                        </div>
                    );
                })}
            </div>
            <div className="container">
                <div className="sliders">
                    <SliderComponent arrImages={[slider1, slider2, slider3]} />
                </div>

                <div className="card-component">
                    <CardComponent />
                </div>
            </div>
            <NavBarComponent />
        </>
    );
}

export default HomePage;
