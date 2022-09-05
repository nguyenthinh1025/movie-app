import React, { useState, useEffect } from 'react';
import { StarOutlined, StarFilled, StarTwoTone } from '@ant-design/icons';
import { RadioChangeEvent } from 'antd';
import { Radio, Space, Tabs } from 'antd';
import { Rate } from 'antd';
import { Button, CustomCard } from '@tsamantanis/react-glassmorphism'
import '@tsamantanis/react-glassmorphism/dist/index.css';
import './../../assets/styles/circle.scss'
import { useSelector, useDispatch } from 'react-redux';
import { SET_CHI_TIET_PHIM } from '../../redux/action/type/QuanLyRapType';
import { layChiTietPhim } from '../../redux/action/QuanLyRapAction';
import moment from 'moment';
import _ from 'lodash';
import { NavLink } from 'react-router-dom';
export default function Detail (props) {


    const { TabPane } = Tabs;

    const TabPosition = 'left' | 'right' | 'top' | 'bottom';
    const [tabPosition, setTabPosition] = useState('left');
    const { filmDetail } = useSelector(rootReducer => rootReducer.QuanLyPhimReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        let { id } = props.match.params;
        const action = layChiTietPhim(id);
        dispatch(action);
    }, []);
    console.log(filmDetail);
    return (
        <div style={{ backgroundImage: `url(${filmDetail.hinhAnh})`, minHeight: '100vh', backgroundSize: '100%', backgroundPosition: 'center' }}>
            <CustomCard
                style={{ paddingTop: 150, minHeight: '100vh' }}
                effectColor="#fff" // required
                color="#fff" // default color is white
                blur={20} // default blur value is 10px
                borderRadius={0} // default border radius value is 10px
            >
                <div className='grid grid-cols-12'>
                    <div className='col-span-5 col-start-3'>
                        <div className='grid grid-cols-3'>
                            <img src={filmDetail.hinhAnh} style={{ width: 300 }} />
                            <div className='col-span-2 pl-3 '>
                                <p className='text-4xl font-bold text-red-500'>Tên Phim :{filmDetail.tenPhim}</p>
                                <p className='text-lg'>Ngày Chiếu : {moment(filmDetail.ngayKhoiChieu).format('DD-MM-YYYY')}</p>
                                <p>Mô Tả:{filmDetail.moTa}</p>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-4'>
                        <h1 style={{ marginLeft: '25%' }} className=' text-green-400 text-2xl'>Đánh Giá</h1>
                        <h1 style={{ marginLeft: '30%' }} className=' text-green-400 text-2xl '>
                            <Rate allowHalf value={filmDetail.danhGia / 2} />
                        </h1>
                        <div className={`c100 p${filmDetail.danhGia * 10} big text-right`}>
                            <span>{filmDetail.danhGia * 10}%</span>
                            <div className="slice">
                                <div className="bar" />
                                <div className="fill" />
                            </div>
                        </div>

                    </div>

                </div>


                <Tabs defaultActiveKey="1" centered>
                    <TabPane tab="Lịch Chiếu" key="1" >
                        <div className=' container'>
                            <Tabs tabPosition={tabPosition} >
                                {filmDetail.heThongRapChieu?.map((item, index) => {
                                    return <TabPane tab={<div className='grid grid-cols-2'>
                                        <img src={item.logo} style={{ width: '50px', marginRight: '40px' }} />
                                        <p className='text-white'>{item.tenHeThongRap}</p>
                                    </div>} key={index}>


                                        {item.cumRapChieu?.map((cumRap, index) => {
                                            return <div key={index} className='mt-5'>
                                                <div className='flex flex-row'>
                                                    <img src={cumRap.hinhAnh} style={{ width: '50px' }} />
                                                    <div>
                                                        <p className='text-white ml-5 text-2xl'>  {cumRap.tenCumRap}</p>
                                                        <p className='text-gray-400 ml-5' >  {cumRap.tenCumRap}</p>
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-4'>
                                                    {cumRap.lichChieuPhim?.slice(0, 12).map((item, index) => {
                                                        return <NavLink to={`/checkout/${item.maLichChieu}`} className='col-span-1 text-green-800 font-bold' key={index}>
                                                            {moment(item.ngayChieuGioChieu).format('hh:mm A')}

                                                        </NavLink>
                                                    })}
                                                </div>
                                            </div>
                                        })}

                                    </TabPane>
                                })}
                            </Tabs>
                        </div>
                    </TabPane>
                    <TabPane tab="Thông Tin" key="2">
                        Content of Tab Pane 2
                    </TabPane>
                    <TabPane tab="Đánh Giá" key="3">
                        Content of Tab Pane 3
                    </TabPane>
                </Tabs>

            </CustomCard>

        </div>
    )

}
