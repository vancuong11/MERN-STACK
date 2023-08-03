import { Image } from 'antd';
import { useEffect, useState } from 'react';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputForm from '../../components/InputForm/InputForm';
import logo from '../../assets/images/logo-dn.png';
import * as userService from '../../services/userService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import './SignInPage.scss';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';
import jwt_decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlide';

function SignInPage() {
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleNavigateSignUp = () => {
        navigate('/sign-up');
    };
    const mutation = useMutationHooks((data) => userService.loginUser(data));
    const { data, isLoading, isError, isSuccess } = mutation;

    useEffect(() => {
        if (isSuccess) {
            navigate('/');
            localStorage.setItem('access_token', data.access_token);
            if (data?.access_token) {
                const decode = jwt_decode(data?.access_token);
                if (decode.id) {
                    handleGetDetailsUser(decode.id, data.access_token);
                }
            }
        }
    }, [isSuccess]);

    const handleGetDetailsUser = async (id, token) => {
        const res = await userService.getDetailsUser(id, token);
        dispatch(updateUser({ ...res.data, access_token: token }));
    };

    const handleOnChangeEmail = (value) => {
        setEmail(value);
    };

    const handleOnChangePassword = (value) => {
        setPassword(value);
    };

    const handleSignIn = () => {
        mutation.mutate({
            email,
            password,
        });
    };

    return (
        <div className="modal-container">
            <div className="container-sign-in">
                <div className="left">
                    <div className="heading">
                        <h4>Xin chào,</h4>
                        <p>Đăng nhập hoặc Tạo tài khoản</p>
                    </div>
                    <InputForm
                        value={email}
                        onChange={handleOnChangeEmail}
                        placeholder="abc@gmail.com"
                        style={{ marginBottom: '15px' }}
                    />
                    <div className="form-input">
                        <span onClick={() => setIsShowPassword(!isShowPassword)}>
                            {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
                        </span>
                        <InputForm
                            value={password}
                            onChange={handleOnChangePassword}
                            placeholder="Password"
                            type={isShowPassword ? 'text' : 'password'}
                        />
                    </div>
                    {data?.status === 'ERROR' && <span style={{ color: 'red' }}>{data?.message}</span>}
                    <Loading isLoading={isLoading}>
                        <div className="group-button">
                            <ButtonComponent
                                disabled={!email.length || !password.length}
                                onClick={handleSignIn}
                                className="btn-submit-product"
                                type="primary"
                                danger
                                textButton="Đăng nhập"
                            />
                        </div>
                    </Loading>
                    {/* <p className="login-with-email">Đăng nhập bằng email</p> */}
                    <p className="forgot-password">Quên mật khẩu</p>
                    <p>
                        Chưa có tài khoản?{' '}
                        <span className="create-account" onClick={() => handleNavigateSignUp()}>
                            Tạo tài khoản
                        </span>
                    </p>
                </div>
                <div className="right">
                    <Image className="img-logo" src={logo} alt="Logo Đăng nhập" preview={false} />
                    <div className="content">
                        <h4>Mua sắm tại Tiki</h4>
                        <span>Siêu ưu đãi mỗi ngày</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignInPage;
