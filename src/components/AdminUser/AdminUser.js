import { Button, Form, Space, Upload } from 'antd';
import './AdminUser.scss';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import ModalComponent from '../ModalComponent/ModalComponent';
import Loading from '../LoadingComponent/Loading';
import InputComponent from '../InputComponent/InputComponent';
import * as userService from '../../services/userService';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as message from '../../components/Message/Message';
import { getBase64 } from '../../utils';
import DrawerComponent from '../DrawerComponent/DrawerComponent';

function AdminUser() {
    // ---------------------- state -------------------------
    const [rowSelected, setRowSelected] = useState('');
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);
    const [isLoadingUpdate, setIsLoadingUpdate] = useState(false);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const user = useSelector((state) => state.user);
    const searchInput = useRef(null);
    const [searchedColumn, setSearchedColumn] = useState('');

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        email: '',
        phone: '',
        isAdmin: false,
        avatar: '',
        address: '',
    });
    const [form] = Form.useForm();

    // ----------------- create user ------------------------
    // const mutation = useMutationHooks((data) => userService.createUser(data));

    // const { data, isLoading, isError, isSuccess } = mutation;
    // useEffect(() => {
    //     if (isSuccess && data.status === 'OK') {
    //         message.success('Created product successfully');
    //         handleCancel();
    //     } else if (isError) {
    //         message.error('Created product error');
    //     }
    // }, [isSuccess, isError]);

    // const onFinish = () => {
    //     mutation.mutate(stateUser, {
    //         onSettled: () => {
    //             queryUser.refetch();
    //         },
    //     });
    // };

    // const handleOnchange = (e) => {
    //     setStateUser({
    //         ...stateUser,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // const handleCancel = () => {
    //     setIsModalOpen(false);
    //     setStateUser({
    //         name: '',
    //         email: '',
    //         phone: '',
    //         isAdmin: false,
    //     });
    //     form.resetFields();
    // };

    // const handleOnChangeAvatar = async ({ fileList }) => {
    //     const file = fileList[0];
    //     if (!file.url && !file.preview) {
    //         file.preview = await getBase64(file.originFileObj);
    //     }
    //     setStateUser({
    //         ...stateUser,
    //         avatar: file.preview,
    //     });
    // };
    // ----------------- end create user ------------------------

    // update user ------------------------
    const mutationUpdate = useMutationHooks((data) => {
        const { id, token, ...rests } = data;
        const res = userService.updateUser(id, { ...rests }, token);
        return res;
    });
    const {
        data: dataUpdated,
        isLoading: isLoadingUpdated,
        isSuccess: isSuccessUpdated,
        isError: isErrorUpdated,
    } = mutationUpdate;

    useEffect(() => {
        if (isSuccessUpdated && dataUpdated.status === 'OK') {
            message.success('Update User successfully');
            handleCloseDrawer();
        } else if (isErrorUpdated) {
            message.error('Update User error');
        }
    }, [isSuccessUpdated, isErrorUpdated]);

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
        setStateUserDetails({
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
        });
        form.resetFields();
    };

    const onUpdateUser = () => {
        mutationUpdate.mutate(
            { id: rowSelected, token: user?.access_token, ...stateUserDetails },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    const handleOnChangeDetailAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetails({
            ...stateUserDetails,
            avatar: file.preview,
        });
    };

    const handleOnchangeDetail = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value,
        });
    };
    // end update user ------------------------

    // delete user ------------------------
    const mutationDeleted = useMutationHooks((data) => {
        const { id, token } = data;
        const res = userService.deleteUser(id, token);
        return res;
    });

    const {
        data: dataDeleted,
        isLoading: isLoadingDeleted,
        isSuccess: isSuccessDeleted,
        isError: isErrorDeleted,
    } = mutationDeleted;

    const handleDeleteUser = () => {
        mutationDeleted.mutate(
            { id: rowSelected, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    useEffect(() => {
        if (isSuccessDeleted && dataDeleted?.status === 'OK') {
            message.success('Delete User Success');
            handleCancelDelete();
        } else if (isErrorDeleted) {
            message.error('Delete User Error');
        }
    }, [isSuccessDeleted]);

    const handleCancelDelete = () => {
        setIsModalOpenDelete(false);
    };
    // end delete user ------------------------

    // -----delete many users------------------------
    const mutationDeletedMany = useMutationHooks((data) => {
        const { token, ...id } = data;
        const res = userService.deleteManyUser(id, token);
        return res;
    });

    const {
        data: dataDeletedMany,
        isLoading: isLoadingDeletedMany,
        isSuccess: isSuccessDeletedMany,
        isError: isErrorDeletedMany,
    } = mutationDeleted;

    const handleDeleteManyUser = (id) => {
        mutationDeleted.mutate(
            { id: id, token: user?.access_token },
            {
                onSettled: () => {
                    queryUser.refetch();
                },
            },
        );
    };

    useEffect(() => {
        if (isSuccessDeletedMany && dataDeletedMany?.status === 'OK') {
            message.success('Delete User Success');
        } else if (isErrorDeleted) {
            message.error('Delete User Error');
        }
    }, [isErrorDeletedMany, isSuccessDeletedMany]);
    // end delete user ------------------------

    // edit user ------------------------
    const fetchGetDetailUser = async (rowSelected) => {
        const res = await userService.getDetailsUser(rowSelected);
        if (res?.data) {
            setStateUserDetails({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                isAdmin: res?.data?.isAdmin,
                // avatar: res?.data?.avatar,
            });
        }
        setIsLoadingUpdate(false);
    };

    useEffect(() => {
        form.setFieldsValue(stateUserDetails);
    }, [form, stateUserDetails]);

    useEffect(() => {
        if (rowSelected && isOpenDrawer) {
            setIsLoadingUpdate(true);
            fetchGetDetailUser(rowSelected);
        }
    }, [rowSelected, isOpenDrawer]);

    const handleDetailsUser = () => {
        setIsOpenDrawer(true);
    };

    // end edit user ------------------------

    // ------------- render data form user --------------------------------

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
    // -----------------end search-----------------------------------------------

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
                    onClick={handleDetailsUser}
                />
            </div>
        );
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
            ...getColumnSearchProps('name'),
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email'),
        },
        {
            title: 'Address',
            dataIndex: 'address',
            sorter: (a, b) => a.address.length - b.address.length,
            ...getColumnSearchProps('address'),
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'True',
                    value: true,
                },
                {
                    text: 'False',
                    value: false,
                },
            ],
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            sorter: (a, b) => a.phone - b.phone,
            ...getColumnSearchProps('phone'),
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction,
        },
    ];

    const getAllUsers = async () => {
        const res = await userService.getAllUser();
        return res.data;
    };

    const queryUser = useQuery({ queryKey: ['user'], queryFn: getAllUsers });
    const { isLoading: isLoadingUser, data: users } = queryUser;

    const dataTable =
        users?.length > 0 &&
        users?.map((user) => {
            return { ...user, key: user._id, isAdmin: user.isAdmin ? 'TRUE' : 'FALSE' };
        });
    // ---------------end render data form user--------------------------------------

    return (
        <div className="admin-user-container">
            <div className="admin-user">
                <h1>Quản lý người dùng</h1>
            </div>
            <div className="admin-table">
                <TableComponent
                    handleDeleteMany={handleDeleteManyUser}
                    data={dataTable}
                    isLoading={isLoadingUser}
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

            <DrawerComponent
                forceRender
                title="Chi tiết người dùng"
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
                        onFinish={onUpdateUser}
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
                            <InputComponent value={stateUserDetails.name} onChange={handleOnchangeDetail} name="name" />
                        </Form.Item>

                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your email!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateUserDetails.email}
                                onChange={handleOnchangeDetail}
                                name="email"
                            />
                        </Form.Item>

                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your count inStock!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateUserDetails.phone}
                                onChange={handleOnchangeDetail}
                                name="phone"
                            />
                        </Form.Item>

                        {/* <Form.Item
                            label="Admin"
                            name="isAdmin"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your isAdmin!',
                                },
                            ]}
                        >
                            <InputComponent
                                value={stateUserDetails.isAdmin}
                                onChange={handleOnchangeDetail}
                                name="isAdmin"
                            />
                        </Form.Item> */}

                        {/* <Form.Item
                            label="Avatar"
                            name="avatar"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your avatar!',
                                },
                            ]}
                        >
                            <div className="upload-img">
                                <Upload
                                    className="upload-profile"
                                    maxCount={1}
                                    // onChange={handleOnChangeDetailAvatar}
                                >
                                    <Button>Select File</Button>
                                </Upload>

                                {stateUserDetails.avatar.length > 0 && stateUserDetails.avatar && (
                                    <img
                                        src={stateUserDetails.avatar}
                                        style={{
                                            height: '60px',
                                            width: '60px',
                                            objectFit: 'cover',
                                        }}
                                        alt="avatar"
                                    />
                                )}
                            </div>
                        </Form.Item> */}

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
                title="Xóa người dùng"
                open={isModalOpenDelete}
                onCancel={handleCancelDelete}
                onOk={handleDeleteUser}
            >
                <Loading isLoading={isLoadingDeleted}>
                    <div>Bạn có chắc xóa tài khoản này không</div>
                </Loading>
            </ModalComponent>
        </div>
    );
}

export default AdminUser;
