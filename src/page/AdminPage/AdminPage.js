import { AppstoreOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useState } from 'react';
import { getItem } from '../../utils';
import './AdminPage.scss';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';

function AdminPage() {
    const items = [
        getItem('Người dùng', 'user', <UserOutlined />),
        getItem('Sản phẩm', 'products', <AppstoreOutlined />),
    ];
    const [keySelected, setKeySelected] = useState('');
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return <AdminUser />;
                break;
            case 'products':
                return <AdminProduct />;
            default:
                return <></>;
        }
    };

    const handleOnClick = ({ key }) => {
        setKeySelected(key);
    };
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div className="admin-container">
                <Menu
                    mode="inline"
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                    }}
                    items={items}
                    onClick={handleOnClick}
                />

                <div className="admin-content">{renderPage(keySelected)}</div>
            </div>
        </>
    );
}

export default AdminPage;
