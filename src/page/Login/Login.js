import { type } from '@testing-library/user-event/dist/type';
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { DangNhapAction } from '../../redux/action/quanLyNguoiDungAction';

export default function Login () {
    const { userLogin } = useSelector(rootReducer => rootReducer.quanLynguoiDungReducer);
    console.log(userLogin);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            taiKhoan: '',
            matKhau: '',
        },
        onSubmit: values => {
            const action = DangNhapAction(values);
            dispatch(action);
            console.log(values);
        },
    });



    return (
        <div className="lg:w-6/12 px-4 md:px-0">
            <div className="md:p-12 md:mx-6">
                <div className="text-center">
                    <img className="mx-auto w-48" src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" alt="logo" />
                    <h4 className="text-xl font-semibold mt-1 mb-12 pb-1">Movie</h4>
                </div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit(e)
                }}>
                    <div className='font-bold'>
                        <h3>User</h3>
                        <p>Tài Khỏan : 1234</p>
                        <p>Mật khẩu : 1234</p>
                        <h3>Admin</h3>
                        <p>Tài Khỏan : tinh1234</p>
                        <p>Mật khẩu : tinh1234</p>
                    </div>
                    <p className="mb-4">Please login to your account</p>
                    <div className="mb-4">
                        <input type="text" name='taiKhoan' onChange={formik.handleChange} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Tài Khoản" />
                    </div>
                    <div className="mb-4">
                        <input type="password" name='matKhau' onChange={formik.handleChange} className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" placeholder="Mật Khẩu" />
                    </div>
                    <div className="text-center pt-1 mb-12 pb-1">
                        <button type='submit' className="inline-block px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3" data-mdb-ripple="true" data-mdb-ripple-color="light" style={{
                            background: 'linear-gradient(to right,#ee7724, #d8363a, #dd3675, #b44593)'
                        }}>
                            Đăng Nhập
                        </button>
                        <a className="text-gray-500" href="#!">Forgot password?</a>
                    </div>
                    <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?<NavLink to='/register'>Đăng Kí</NavLink></p>

                    </div>
                </form>
            </div>
        </div>
    )
}
