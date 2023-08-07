import { useEffect, useState } from 'react';
import InputForm from '../../components/InputForm/InputForm';
import './ProfilePage.scss';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useDispatch, useSelector } from 'react-redux';
import * as userService from '../../services/userService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slices/userSlide';
import { Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { getBase64 } from '../../utils';

function Profile() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState('');

    useEffect(() => {
        setEmail(user.email);
        setName(user.name);
        setPhone(user.phone);
        setAddress(user.address);
        setAvatar(user.avatar);
    }, [user]);

    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };
    const handleOnChangeName = (value) => {
        setName(value);
    };
    const handleOnChangePhone = (value) => {
        setPhone(value);
    };
    const handleOnChangeAddress = (value) => {
        setAddress(value);
    };
    const handleOnChangeAvatar = async ({ fileList }) => {
        const file = fileList[0];
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);
    };

    const mutation = useMutationHooks(async (data) => {
        const { id, access_token, ...rests } = data;
        await userService.updateUser(id, rests, access_token);
    });
    const { data, isLoading, isError, isSuccess } = mutation;

    useEffect(() => {
        if (isSuccess) {
            message.success('Updated user successfully!');
            handleGetDetailsUser(user.id, user.access_token);
        } else if (isError) {
            message.error('Updated user error!');
        }
    }, [isSuccess, isError]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await userService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res.data, access_token: token }));
    };

    const handleUpdateUser = () => {
        mutation.mutate({ id: user.id, name, email, phone, address, avatar, access_token: user.access_token });
    };

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>Thông tin người dùng</h1>
            </div>
            <Loading isLoading={isLoading}>
                <div className="profile-content">
                    <div className="profile-input-form">
                        <label htmlFor="name" className="profile-label">
                            Name:
                        </label>
                        <InputForm className="profile-input" id="name" value={name} onChange={handleOnChangeName} />
                    </div>
                    <div className="profile-input-form">
                        <label className="profile-label">Email:</label>
                        <InputForm className="profile-input" value={email} onChange={handleOnChangeEmail} />
                    </div>
                    <div className="profile-input-form">
                        <label className="profile-label">Phone:</label>
                        <InputForm className="profile-input" value={phone} onChange={handleOnChangePhone} />
                    </div>
                    <div className="profile-input-form">
                        <label className="profile-label">Address:</label>
                        <InputForm className="profile-input" value={address} onChange={handleOnChangeAddress} />
                    </div>
                    <div className="profile-input-form">
                        <label className="profile-label">Avatar:</label>
                        <Upload className="upload-profile" onChange={handleOnChangeAvatar} maxCount={1}>
                            <Button icon={<UploadOutlined />}>Select File</Button>
                        </Upload>
                        {avatar.length > 0 && avatar && (
                            <img
                                src={avatar}
                                style={{ height: '60px', width: '60px', borderRadius: '50%', objectFit: 'cover' }}
                                alt="avatar"
                            />
                        )}
                        {/* <InputForm
                            className="profile-input"
                            type="file"
                            value={avatar}
                            onChange={handleOnChangeAvatar}
                        /> */}
                    </div>
                    <div className="btn-submit-profile">
                        <ButtonComponent textButton="Cập nhật" type="primary" onClick={handleUpdateUser} />
                    </div>
                </div>
            </Loading>
        </div>
    );
}

export default Profile;
