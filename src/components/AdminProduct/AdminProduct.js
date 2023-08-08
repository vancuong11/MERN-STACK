import { DeleteOutlined, EditOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, Upload } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import './AdminProduct.scss';
import { useEffect, useState } from 'react';
import InputComponent from '../InputComponent/InputComponent';
import { getBase64 } from '../../utils';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as productService from '../../services/productService';
import Loading from '../LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { useQuery } from '@tanstack/react-query';

function AdminProduct() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [stateProduct, setStateProduct] = useState({
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

    const onFinish = () => {
        mutation.mutate(stateProduct);
    };
    const handleOnchange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value,
        });
    };

    const getAllProducts = async () => {
        const res = await productService.getAllProduct();
        return res.data;
    };

    const { isLoading: isLoadingProduct, data: products } = useQuery({
        queryKey: ['products'],
        queryFn: getAllProducts,
    });
    // column & data table
    const renderAction = () => {
        return (
            <div>
                <DeleteOutlined style={{ color: 'red', fontSize: '30px', cursor: 'pointer' }} />
                <EditOutlined style={{ color: 'orange', fontSize: '30px', cursor: 'pointer' }} />
            </div>
        );
    };
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Price',
            dataIndex: 'price',
        },
        {
            title: 'Rating',
            dataIndex: 'rating',
        },
        {
            title: 'Type',
            dataIndex: 'type',
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

    return (
        <div className="admin-product-container">
            <div className="admin-product">
                <h1>Quản lý sản phẩm</h1>
            </div>

            <Button onClick={showModal} className="btn-add">
                <PlusOutlined className="icon-add" />
            </Button>

            <div className="admin-table">
                <TableComponent data={dataTable} isLoading={isLoadingProduct} columns={columns} />
            </div>

            <Modal title="Tạo mới sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="Name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your name!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProduct.name} onChange={handleOnchange} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Type"
                            name="Type"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your type!',
                                },
                            ]}
                        >
                            <InputComponent value={stateProduct.type} onChange={handleOnchange} name="type" />
                        </Form.Item>

                        <Form.Item
                            label="count inStock"
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
            </Modal>
        </div>
    );
}

export default AdminProduct;
