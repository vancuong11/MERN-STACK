import { Divider, Dropdown, Radio, Space, Table } from 'antd';
import { useState } from 'react';
import Loading from '../LoadingComponent/Loading';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import './TableComponent.scss';

function TableComponent(props) {
    const { selectionType = 'checkbox', data, isLoading, columns, handleDeleteMany } = props;
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            setRowSelectedKeys(selectedRowKeys);
            // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // getCheckboxProps: (record) => ({
        //     disabled: record.name === 'Disabled User',
        //     // Column configuration not to be checked
        //     name: record.name,
        // }),
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys);
    };
    return (
        <div>
            <Loading isLoading={isLoading}>
                {rowSelectedKeys.length > 0 && (
                    <div className="delete-all" onClick={handleDeleteAll}>
                        Xóa tất cả
                    </div>
                )}

                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                    {...props}
                />
            </Loading>
        </div>
    );
}

export default TableComponent;
