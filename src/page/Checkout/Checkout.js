import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { datGheAction, datVeAction, QuanLyDatVeAction } from '../../redux/action/QuanLyDatVeAction';
import style from './Checkout.module.css';
import './Checkout.css'
import _, { get, map } from 'lodash';

import { Button, Tabs } from 'antd';
import { CloseOutlined } from '@ant-design/icons'
import { DANH_SACH_GHE_DANG_DAT } from '../../redux/action/type/QuanLyDatVeType';
import { ThongTinDatVe } from '../../_core/models/ThongTinDatVe';
import { layThongTinNguoiDung } from '../../redux/action/quanLyNguoiDungAction';
import moment from 'moment';
import { connection } from '../..//index';
import { clear } from '@testing-library/user-event/dist/clear';
import { history } from '../../App';
import { USER_LOGIN } from '../../util/setting';
import { TOKEN_USER } from '../../redux/action/type/QuanLyNguoiDungType';
import { NavLink } from 'react-router-dom';


const { TabPane } = Tabs;
function Checkout (props) {
    const dispatch = useDispatch()
    const { userLogin } = useSelector(rootReducer => rootReducer.quanLynguoiDungReducer);
    const { chiTietPhongVe, danhSachGheDangDat, danhSachGheKhachDat } = useSelector(rootReducer => rootReducer.QuanLyDatVeReducer);
    useEffect(() => {
        const { id } = props.match.params;
        const action = QuanLyDatVeAction(id);
        dispatch(action);
        connection.on('datVeThanhCong', () => {
            dispatch(action)
        });
        connection.on('loadDanhSachGheDaDat', (dSGheKhachDat) => {

            dSGheKhachDat = dSGheKhachDat.filter(item => item.taiKhoan !== userLogin.taiKhoan);
            let arrGheKhachDat = dSGheKhachDat.reduce((result, item, index) => {
                let arrGhe = JSON.parse(item.danhSachGhe)
                return [...result, ...arrGhe]
            }, []);

            arrGheKhachDat = _.unionBy(arrGheKhachDat, 'maGhe');

            dispatch({
                type: "DAT_GHE",
                arrGheKhachDat
            })
            console.log(arrGheKhachDat);

        })
        window.addEventListener('beforeunload', clearGhe);

        return () => {
            clearGhe();
            window.removeEventListener('beforeunload', clearGhe)
        }

    }, []);

    const clearGhe = function(event) {
        connection.invoke('huyDat', userLogin.taiKhoan, props.match.params.id)
    }
    console.log(chiTietPhongVe);

    console.log(danhSachGheDangDat);
    const { thongTinPhim, danhSachGhe } = chiTietPhongVe;


    const renderSeats = () => {
        return danhSachGhe.map((danhSach, index) => {

            let classGheVip = danhSach.loaiGhe === 'Vip' ? 'gheVip' : '';
            let classGheDaDat = danhSach.daDat === true ? 'gheDaDat' : '';
            let classGheKhachDat = '';
            let classGheDangDat = '';
            let indexGheDD = danhSachGheDangDat.findIndex(ghe => ghe.maGhe === danhSach.maGhe);
            if (indexGheDD != -1) {
                classGheDangDat = 'gheDangDat';
            }
            let indexGheKhachDat = danhSachGheKhachDat.findIndex(gheKD => gheKD.maGhe === danhSach.maGhe);
            if (indexGheKhachDat != -1) {
                classGheKhachDat = 'gheKhachDat';
            }
            return <Fragment key={index}>
                <button onClick={() => {
                    const action = datGheAction(danhSach, props.match.params.id)
                    dispatch(action)
                }} disabled={danhSach.daDat || classGheKhachDat} className={`ghe ${classGheVip} ${classGheDaDat}${classGheDangDat} ${classGheKhachDat} text-center`} key={index}>{danhSach.daDat ? <CloseOutlined style={{ fontWeight: 'bold' }} /> : danhSach.stt}</button>
                {(index + 1) % 16 === 0 ? <br /> : ''}
            </Fragment>

        })
    }
    return (
        <div className=' min-h-screen' style={{}}>
            <div className='grid grid-cols-12'>
                <div className='col-span-9'>
                    <div className='flex flex-col items-center mt-5'>
                        <img src='./../../image/screen.png' />
                        <div className=''>
                            {renderSeats()}
                        </div>
                    </div>

                </div>
                <div className='col-span-3 mr-5'>
                    <h3 className='text-green-400 text-center text-2xl'>{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                        return tongTien += ghe.giaVe;
                    }, 0)}</h3>
                    <hr />
                    <h3 className='text-xl'>{thongTinPhim.tenPhim}</h3>
                    <p>Địa điễm :{thongTinPhim.tenCumRap}-{thongTinPhim.tenRap}</p>
                    <p>ngày Chiếu : {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}</p>
                    <hr />
                    <div className='grid grid-cols-2 my-5'>
                        <div>
                            <span className='text-red-500'>Ghế: {danhSachGheDangDat.map((item, index) => {
                                return <span className='text-red-500' key={index}>{item.stt} ,</span>
                            })}</span>
                        </div>
                        <div className='text-right'>
                            <span className='text-green-400'>{danhSachGheDangDat.reduce((tongTien, ghe, index) => {
                                return tongTien += ghe.giaVe;
                            }, 0)}</span>
                        </div>
                    </div>
                    <hr />
                    <div className='my-5'>
                        <i>Email:</i> <br />
                        {userLogin.email}
                    </div>
                    <hr />
                    <div className='my-5'>
                        <i>Họ Tên</i><br />
                        {userLogin.hoTen}
                    </div>
                    <hr />
                    <div className='flex flex-col justify-around'>
                        <div className='bg-green-500 text-white w-full text-center py-3 font-bold text-2xl cursor-pointer' onClick={() => {
                            const thongtinDatVe = new ThongTinDatVe();
                            thongtinDatVe.maLichChieu = props.match.params.id;
                            thongtinDatVe.danhSachVe = danhSachGheDangDat;
                            const action = datVeAction(thongtinDatVe);
                            dispatch(action);
                        }}>
                            Đặt Vé
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}






export default function(props) {

    const dispatch = useDispatch();
    const { tabActive } = useSelector(rootReducer => rootReducer.QuanLyDatVeReducer);
    const { userLogin } = useSelector(state => state.quanLynguoiDungReducer)
    const operations = <Fragment>
        {!_.isEmpty(userLogin) ? <Fragment><button onClick={() => {
            history.push('/profile')
        }} className='text-2xl ml-3'> Hello! {userLogin.taiKhoan}</button><button className='text-blue-800' onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN_USER);
            history.push('/home');
            window.location.reload();
        }}>Đăng Xuất</button> </Fragment> : ''
        }
    </Fragment >;
    return <div className='p-5'>
        <Tabs tabBarExtraContent={operations} defaultActiveKey='1' activeKey={tabActive} onChange={(key) => {
            dispatch({
                type: 'CHANGE_TAB_ACTIVE',
                number: key
            })
        }} >
            <TabPane tab="01 CHỌN GHẾ & THANH TOÁN" key="1">
                <Checkout {...props} />
            </TabPane>
            <TabPane tab="KẾT QUẢ ĐẶT VÉ" key="2"  >
                <KetQuaDatVe {...props} />
            </TabPane>
            <TabPane tab={<div className='text-center' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><NavLink style={{ marginLeft: 10 }} to='/home'>Home</NavLink></div>} key="3"  >
                <KetQuaDatVe {...props} />
            </TabPane>
        </Tabs>
    </div>
};



export function KetQuaDatVe (props) {
    const { userLogin } = useSelector(rootReducer => rootReducer.quanLynguoiDungReducer);
    const { thongTinNguoiDung } = useSelector(rootReducer => rootReducer.quanLynguoiDungReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        const action = layThongTinNguoiDung();
        dispatch(action);
    }, [])
    console.log(thongTinNguoiDung);

    const renderTicketItem = () => {
        return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
            return <div className="p-2 lg:w-1/3 md:w-1/2 w-full" key={index}>
                <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
                    <img alt="team" className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4" src="https://dummyimage.com/80x80" />
                    <div className="flex-grow">
                        <h2 className="text-gray-900 title-font font-medium">{ticket.tenPhim}</h2>
                        <p className="text-gray-500">{moment(ticket.ngayDat).format('hh:mm A -DD/MM/YYYY')}</p>
                        <p>Địa điểm :{_.first(ticket.danhSachGhe).tenCumRap}</p>
                        <p>Ghế : {ticket.danhSachGhe?.map((item, index) => {
                            return <span key={index} className='text-red'>{item.tenGhe} </span>
                        })}</p>
                    </div>
                </div>
            </div>
        })
    }
    return <div className='p-5'>
        <h3>Kết Quả Đặt Vé</h3>
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-purple-800 ">Lịch sử đặt vé khánh hàng</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Thông tin và thời gian vé đã đặt</p>
                </div>
                <div className="flex flex-wrap -m-2">
                    {renderTicketItem()}
                </div>
            </div>
        </section>

    </div>
}