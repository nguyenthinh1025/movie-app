import React, { useState, useEffect } from 'react'
import { Radio, Space, Tabs } from 'antd';
import useSelection from 'antd/lib/table/hooks/useSelection';
import { useSelector, useDispatch } from 'react-redux';
import { QuanLyRapAction } from '../../../redux/action/QuanLyRapAction';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
import _ from 'lodash';


export default function HomeMenu (props) {
    const { heThongRapChieu } = useSelector(rootReducer => rootReducer.QuanLyRapReducer);
    const TabPosition = 'left' | 'right' | 'top' | 'bottom';
    const { TabPane } = Tabs;
    const [tabPosition, setTabPosition] = useState('left');
    const dispatch = useDispatch();
    const changeTabPosition = (e) => {
        setTabPosition(e.target.value);
    };
    useEffect(() => {
        const action = QuanLyRapAction();
        dispatch(action);
    }, []);
    return (
        <div>
            {/* <Space style={{ marginBottom: 24 }}>
                Tab position:
                <Radio.Group value={tabPosition} onChange={changeTabPosition}>
                    <Radio.Button value="top">top</Radio.Button>
                    <Radio.Button value="bottom">bottom</Radio.Button>
                    <Radio.Button value="left">left</Radio.Button>
                    <Radio.Button value="right">right</Radio.Button>
                </Radio.Group>
            </Space> */}
            <Tabs tabPosition={tabPosition}>
                {heThongRapChieu.map((item, index) => {
                    return <TabPane tab={<img src={item.logo} style={{ width: '50px' }} />} key={index++} >
                        <Tabs tabPosition={tabPosition} key={index}>
                            {item.lstCumRap.map((cumRap, index) => {
                                return <TabPane tab={
                                    <div className='grid grid-cols-5 gap-2' style={{ width: '400px' }}>
                                        <img src={cumRap.hinhAnh} style={{ width: '50px' }} />
                                        <div className='col-span-4 text-left'>
                                            {cumRap.tenCumRap}
                                            <p className='text-red-500'>Chi Tiết</p>
                                        </div>
                                    </div>
                                } key={index++} >
                                    {cumRap.danhSachPhim.map((item, index) => {
                                        return <div key={index}>
                                            {item.tenPhim}
                                            <div className='grid grid-cols-5'>
                                                {item.lstLichChieuTheoPhim.slice(0, 10).map((item, index) => {
                                                    return <NavLink to={`/checkout/${item.maLichChieu}`} key={index}>{moment(item.ngayChieuGioChieu).format('hh:mm A')}</NavLink>
                                                })}
                                            </div>
                                        </div>
                                    })}
                                </TabPane>
                            })}
                        </Tabs>
                    </TabPane>
                })}

            </Tabs>
        </div>
    )
}
