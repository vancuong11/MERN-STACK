import { Checkbox, Rate } from 'antd';
import './NavBarComponent.scss';

function NavBarComponent() {
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return <div className="content-categories-text">{option}</div>;
                });
                break;
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%' }}>
                        {options.map((option) => {
                            return (
                                <div className="content-categories-checkbox">
                                    <Checkbox value={option.value}>{option.label}</Checkbox>
                                </div>
                            );
                        })}
                    </Checkbox.Group>
                );
                break;
            case 'star':
                return options.map((option) => {
                    return (
                        <div className="content-categories-star">
                            <Rate disabled defaultValue={option} />
                            <span>từ {option} sao</span>
                        </div>
                    );
                });
                break;
            case 'price':
                return options.map((option) => {
                    return <div className="content-categories-price">{option}</div>;
                });
                break;
            default:
                break;
        }
    };

    return (
        <div className="container-navbar">
            <div className="label-categories">
                <label>Danh mục sản phẩm</label>
                {renderContent('text', ['Tủ lạnh', 'TV', 'Máy giặt'])}
                {/* {renderContent('checkbox', [
                    { value: 'a', label: 'A' },
                    { value: 'b', label: 'B' },
                    { value: 'b', label: 'B' },
                ])}
                {renderContent('star', [3, 4, 5])}
                {renderContent('price', ['dưới 40', 'trên 50'])} */}
            </div>
        </div>
    );
}

export default NavBarComponent;
