import { Divider, Radio, Table } from 'antd';
import { useState } from 'react';
import Loading from '../LoadingComponent/Loading';

function TableComponent(props) {
    const { selectionType = 'checkbox', data, isLoading, columns } = props;

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
            console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: (record) => ({
            disabled: record.name === 'Disabled User',
            // Column configuration not to be checked
            name: record.name,
        }),
    };
    return (
        <div>
            <Loading isLoading={isLoading}>
                <Table
                    rowSelection={{
                        type: selectionType,
                        ...rowSelection,
                    }}
                    columns={columns}
                    dataSource={data}
                />
            </Loading>
        </div>
    );
}

export default TableComponent;
