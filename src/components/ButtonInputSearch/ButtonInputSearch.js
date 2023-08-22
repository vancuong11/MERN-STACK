import { Button } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
function ButtonInputSearch(props) {
    const { size, placeholder, textbutton } = props;
    return (
        <div className="search">
            <InputComponent placeholder={placeholder} size={size} {...props} />
            <ButtonComponent size={size} icon={<SearchOutlined />} textbutton={textbutton} />
        </div>
    );
}

export default ButtonInputSearch;
