import { Button } from 'antd';
import './AdminUser.scss';
import { PlusOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';

function AdminUser() {
    return (
        <div className="admin-user-container">
            <div className="admin-user">
                <h1>Quản lý người dùng</h1>
            </div>

            <Button className="btn-add">
                <PlusOutlined className="icon-add" />
            </Button>

            <div className="admin-table">
                <TableComponent />
            </div>
        </div>
    );
}

export default AdminUser;
