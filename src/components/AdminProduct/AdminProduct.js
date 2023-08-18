import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Select, Space, Upload } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import './AdminProduct.scss';
import { useEffect, useRef, useState } from 'react';
import InputComponent from '../InputComponent/InputComponent';
import { getBase64, renderOptions } from '../../utils';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as productService from '../../services/productService';
import Loading from '../LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { useQuery } from '@tanstack/react-query';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { useSelector } from 'react-redux';
import ModalComponent from '../ModalComponent/ModalComponent';

function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const user = useSelector((state) => state.user);
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [typeSelect, setTypeSelect] = useState('');
    const [stateProduct, setStateProduct] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        countInStock: '',
        type: '',
        newType: '',
    });

    const [stateProductDetail, setStateProductDetail] = useState({
        name: '',
        price: '',
        description: '',
        rating: '',
        image: '',
        countInStock: '',
        type: '',
    });

    const showModal = () => {
        setIsModalOpen(true);
    };

    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            countInStock: '',
            type: '',
        });
        form.resetFields();
    };

    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview,
        });
    };

    const handleOnChangeDetailAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetail({
            ...stateProductDetail,
            image: file.preview,
        });
    };

    // ----------------------------------------------------------------
    const mutation = useMutationHooks((data) => productService.createProduct(data));

    const { data, isLoading, isError, isSuccess } = mutation;
    useEffect(() => {
        if (isSuccess && data.status === 'OK') {
            message.success('Created product successfully');
            handleCancel();
        } else if (isError) {
            message.error('Created product error');
        }
    }, [isSuccess, isError]);

    const createProductData = () => {
        const params = {
            name: stateProduct.name,
            price: stateProduct.price,
            description: stateProduct.description,
            rating: stateProduct.rating,
            image: stateProduct.image,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            countInStock: stateProduct.countInStock,
            // discount: stateProduct.discount
        };
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch();
            },
        });
    };

    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleOnchangeDetail = (e) => {
        setStateProductDetail({
            ...stateProductDetail,
            [e.target.name]: e.target.value,
        });
    };

    const getAllProducts = async () => {
        const res = await productService.getAllProduct();
        return res.data;
    };

    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProducts });
    const { isLoading: isLoadingProduct, data: products } = queryProduct;

    const fetchGetDetailProduct = async (rowSelected) => {
        const res = await productService.getDetailsProduct(rowSelected);
        if (res?.data) {
            setStateProductDetail({
                name: res?.data?.name,
                price: res?.data?.price,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                countInStock: res?.data?.countInStock,
                type: res?.data?.type,
            });
        }
        setIsLoadingUpdate(false);
    };

    useEffect(() => {
        form.setFieldsValue(stateProductDetail);
    }, [form, stateProductDetail]);

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            fetchGetDetailProduct(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    const handleDetailsProduct = () => {
        setIsOpenDrawer(true);
    };

    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = productService.updateProduct(id, token, { ...rests });
        return res;
    });

    const {
        data: dataUpdated,
        isLoading: isLoadingUpdated,
        isError: isErrorUpdated,
        isSuccess: isSuccessUpdated,
    } = mutationUpdate;

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateProductDetail({
            name: '',
            price: '',
            description: '',
            rating: '',
            image: '',
            countInStock: '',
            type: '',
        });
        form.resetFields();
    };
    useEffect(() => {
        if (isSuccessUpdated && dataUpdated.status === 'OK') {
            message.success('Update product successfully');
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error('Update product error');
        }
    }, [isSuccessUpdated, isErrorUpdated]);

    const onUpdateProduct = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateProductDetail },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    // ----------------------------------------------------------------
    const mutationDeleted = useMutationHooks((data) => {
        const { id, token } = data;
        const res = productService.deleteProduct(id, token);
        return res;
    });
    const {
        data: dataDeleted,
        isLoading: isLoadingDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDeleted;

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success('Delete Product Success');
            handleCancelDelete();
        } else if (isErrorDeleted) {
            message.error('Delete Product Error');
        }
    }, [isSuccessDeleted]);

    const handleDeleteProduct = () => {
        mutationDeleted.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };

    // ---------------delete many products ---------------
    const mutationDeletedMany = useMutationHooks((data) => {
        const { token, ...id } = data;
        const res = productService.deleteManyProduct(id, token);
        return res;
    });

    const handleDeleteManyProduct = (id) => {
        mutationDeletedMany.mutate(
            { id: id, token: user?.access_token },
            {
                onSettled: () => {
                    queryProduct.refetch();
                },
            },
        );
    };
    const {
        data: dataManyDeleted,
        isLoading: isLoadingManyDeleted,
        isSuccess: isSuccessManyDeleted,
        isError: isErrorManyDeleted,
    } = mutationDeletedMany;

    useEffect(() => {
        if (isSuccessManyDeleted && dataManyDeleted?.status === 'OK') {
            message.success('Delete Product Success');
        } else if (isErrorManyDeleted) {
            message.error('Delete Product Error');
        }
    }, [isSuccessManyDeleted, isErrorManyDeleted]);

    // ---------------end delete many products------------------------

    // column & data table
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined
                    style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }}
                    onClick={() => setIsModalOpenDelete(true)}
                />
                <EditOutlined
                    style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }}
                    onClick={handleDetailsProduct}
                />
            </div>
        );
    };

    // ---------------------Search-------------------------------------------
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <InputComponent
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //     searchedColumn === dataIndex ? (
        //         <Highlighter
        //             highlightStyle={{
        //                 backgroundColor: '#ffc069',
        //                 padding: 0,
        //             }}
        //             searchWords={[searchText]}
        //             autoEscape
        //             textToHighlight={text ? text.toString() : ''}
        //         />
        //     ) : (
        //         text
        //     ),
    });
    // ----------------------------------------------------------------

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: '>=50',
                    value: '>=',
                },
                {
                    text: '<=50',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.price >= 50;
                }
                return record.price <= 50;
            },
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: '>=3',
                    value: '>=',
                },
                {
                    text: '<=3',
                    value: '<=',
                },
            ],
            onFilter: (value, record) => {
                if (value === '>=') {
                    return record.rating >= 3;
                }
                return record.rating <= 3;
            },
        },
        {
            title: 'Type',
            dataIndex: 'type',
            sorter: (a, b) => a.type - b.type,
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];
    const dataTable =
        products?.length > 0 &&
        products?.map((product) => {
            return { ...product, key: product._id };
        });
    // ----------- type product-------------

    const fetchAllTypeProduct = async () => {
        const res = await productService.getAllTypeProduct();
        return res;
    };

    const queryTypeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct });

    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value,
        });
    };

    return (
        <div className="admin-product-container">
            <div className="admin-product">
                <h1>Quản lý sản phẩm</h1>
            </div>

            <Button onClick={showModal} className="btn-add">
                <PlusOutlined className="icon-add" />
            </Button>

            <div className="admin-table">
                <TableComponent
                    handleDeleteMany={handleDeleteManyProduct}
                    data={dataTable}
                    isLoading={isLoadingProduct}
                    columns={columns}
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id);
                            }, // click row
                        };
                    }}
                />
            </div>

            <ModalComponent
                forceRender
                title="Tạo mới sản phẩm"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                <Loading isLoading={isLoading}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 6,
                        }}
                        wrapperCol={{
                            span: 18,
                        }}
                        style={{
                            maxWidth: 600,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={createProductData}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProduct['name']} onChange={handleOnchange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your type!',
                                },
                            ]}
                        >
                            <Select
                                name="type"
                                value={stateProduct.type}
                                onChange={handleChangeSelect}
                                options={renderOptions(queryTypeProduct?.data?.data)}
                            />
                        </Form.Item>
                        {stateProduct.type === 'add_type' && (
                            <Form.Item
                                label="New type"
                                name="newType"
                                rules={[{ required: true, message: 'Please input your type!' }]}
                            >
                                <InputComponent value={stateProduct.newType} onChange={handleOnchange} name="newType" />
                            </Form.Item>
                        )}

                        <Form.Item
                            label="Count InStock"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your count inStock!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.countInStock}
                                onChange={handleOnchange}
                                name="countInStock"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your price!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProduct.price} onChange={handleOnchange} name="price" />
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your rating!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProduct.rating} onChange={handleOnchange} name="rating" />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your description!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProduct.description}
                                onChange={handleOnchange}
                                name="description"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your image!',
                                },
                            ]}
                        >
                            <div className="upload-img">
                                <Upload className="upload-profile" onChange={handleOnChangeAvatar} maxCount={1}>
                                    <Button>Select File</Button>
                                </Upload>

                                {stateProduct.image.length > 0 && stateProduct.image && (
                                    <img
                                        src={stateProduct.image}
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            objectFit: 'cover',
                                        }}
                                        alt="avatar"
                                    />
                                )}
                            </div>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 20,
                                span: 4,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>

            <DrawerComponent
                title="Chi tiết sản phẩm"
                isOpen={isOpenDrawer}
                onClose={() => setIsOpenDrawer(false)}
                width="90%"
            >
                <Loading isLoading={isLoadingUpdated || isLoadingUpdate}>
                    <Form
                        form={form}
                        name="basic"
                        labelCol={{
                            span: 2,
                        }}
                        wrapperCol={{
                            span: 22,
                        }}
                        initialValues={{
                            remember: true,
                        }}
                        onFinish={onUpdateProduct}
                        autoComplete="on"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProductDetail['name']}
                                onChange={handleOnchangeDetail}
                                name="name"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your type!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProductDetail['type']}
                                onChange={handleOnchangeDetail}
                                name="type"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Count InStock"
                            name="countInStock"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your count inStock!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProductDetail.countInStock}
                                onChange={handleOnchangeDetail}
                                name="countInStock"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your price!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProductDetail.price}
                                onChange={handleOnchangeDetail}
                                name="price"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Rating"
                            name="rating"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your rating!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProductDetail.rating}
                                onChange={handleOnchangeDetail}
                                name="rating"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Description"
                            name="description"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your description!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateProductDetail.description}
                                onChange={handleOnchangeDetail}
                                name="description"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your image!',
                                },
                            ]}
                        >
                            <div className="upload-img">
                                <Upload className="upload-profile" onChange={handleOnChangeDetailAvatar} maxCount={1}>
                                    <Button>Select File</Button>
                                </Upload>

                                {stateProductDetail.image.length > 0 && stateProductDetail.image && (
                                    <img
                                        src={stateProductDetail.image}
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            objectFit: 'cover',
                                        }}
                                        alt="avatar"
                                    />
                                )}
                            </div>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                offset: 22,
                                span: 2,
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawerComponent>

            <ModalComponent
                title="Xóa sản phẩm"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteProduct}
            >
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa sản phẩm này không</div>
                </Loading>
            </ModalComponent>
        </div>
    );
}

export default AdminProduct;
