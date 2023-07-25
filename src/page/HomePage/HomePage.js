import TypeProduct from '../../components/TypeProduct/TypeProduct';
import './HomePage.scss';
function HomePage() {
    const arr = ['TV', 'Tủ Lạnh', 'Laptop', 'Điện Thoại'];
    return (
        <div className="container">
            <div className="wrapper-homepage">
                {arr.map((index, item) => {
                    return (
                        <div className="type-product">
                            <TypeProduct name={item} key={index} />
                        </div>
                    );
                })}
            </div>
            Home Page
        </div>
    );
}

export default HomePage;
