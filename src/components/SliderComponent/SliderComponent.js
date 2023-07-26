import { Image } from 'antd';
import Slider from 'react-slick';
import './SliderComponent.scss';

function SliderComponent(props) {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoSpeed: 1000,
    };
    const { arrImages } = props;
    return (
        <Slider {...settings} className="container-slider">
            {arrImages.map((image) => {
                return (
                    <div key={image}>
                        <Image src={image} alt="Slider" preview={false} width="100%" />
                    </div>
                );
            })}
        </Slider>
    );
}

export default SliderComponent;
