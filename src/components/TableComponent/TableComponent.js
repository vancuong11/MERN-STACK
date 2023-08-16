import { Divider, Dropdown, Input, Modal, Radio, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Loading from '../LoadingComponent/Loading';
import { DownloadTableExcel, useDownloadExcel } from 'react-export-table-to-excel';
import './TableComponent.scss';

function TableComponent(props) {
    const { selectionType = 'checkbox', data, isLoading, columns, handleDeleteMany } = props;
    const [rowSelectedKeys, setRowSelectedKeys] = useState([]);
    const [fileName, setFileName] = useState('');

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
    const tableRef = useRef(null);

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKeys);
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOnchange = (e) => {
        setFileName(e.target.value);
    };
    const handleOk = () => {
        onDownload();
        setIsModalOpen(false);
        setFileName('');
    };
    const { onDownload } = useDownloadExcel({
        currentTableRef: tableRef.current,
        filename: fileName,
        sheet: 'Sheet',
    });
    return (
        <div>
            <Loading isLoading={isLoading}>
                {rowSelectedKeys.length > 0 && (
                    <div className="delete-all" onClick={handleDeleteAll}>
                        Xóa tất cả
                    </div>
                )}

                <button onClick={showModal}> Export excel </button>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <Input onChange={handleOnchange} placeholder="Lưu tên file excel"></Input>
                </Modal>

                <Table
                    ref={tableRef}
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
