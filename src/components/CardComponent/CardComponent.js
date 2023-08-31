import { Card, Image } from 'antd';
import { StarFilled } from '@ant-design/icons';
import './CardComponent.scss';
import logo from '../../assets/images/logo.png';
import { useNavigate } from 'react-router-dom';
import { convertPrice } from '../../utils';

function CardComponent(props) {
    const { item } = props;
    const navigate = useNavigate();
    const handleDetailsProduct = () => {
        const id = item._id;
        navigate(`/product-detail/${id}`);
    };
    return (
        <>
            <Card
                className="card-style"
                onClick={() => handleDetailsProduct(item._id)}
                hoverable
                // style={
                //     item.countInStock === 0
                //         ? { backgroundColor: '#ccc', cursor: 'not-allowed' }
                //         : { backgroundColor: '#fff', cursor: 'pointer' }
                // }
                bodyStyle={{ padding: '10px' }}
                cover={<img alt="example" src={item.image} />}
                // disabled={item.countInStock === 0}
            >
                <img src={logo} className="card-logo" />
                <div className="content">
                    <div className="name-product">{item.name}</div>
                    <div className="report-text">
                        <span>
                            <span>{item.rating} </span>
                            <StarFilled className="icon-report" />
                        </span>
                        <span>| Đã bán {item.sell || 1000}+</span>
                    </div>
                    <div className="price">
                        {convertPrice(item.price)}
                        <span className="discount"> - {item.discount || 5}%</span>
                    </div>
                </div>
            </Card>
        </>
    );
}

export default CardComponent;
