import _ from 'lodash';
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Film from '../../component/Film/Film';
import Film_Flip from '../../component/Film/Film_Flip';
import MultipleRowSlick from '../../component/RSlick/MultipleRowSlick';
import { QuanLyPhimAction } from '../../redux/action/QuanLyPhimAction';
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from '../../redux/action/type/QuanLyPhimType';
import HomeCarousel from '../../templates/HomeTemplate/Layout/HomeCarousel/HomeCarousel';
import HomeMenu from './HomeMenu/HomeMenu'

export default function Home () {
    const dispatch = useDispatch()
    useEffect(() => {
        const action = QuanLyPhimAction();
        dispatch(action);
    }, []);
    const arrPhim = useSelector(rootReducer => rootReducer.QuanLyPhimReducer.arrPhim);
    const { heThongRapChieu } = useSelector(rootReducer => rootReducer.QuanLyRapReducer);


    const sapChieu = _.filter(arrPhim, item => item.dangChieu === true);

    return (
        <div >
            <HomeCarousel />

            <div className='container z-0'>
                <div className='container pl-20 pt-20  mx-auto'>
                    <button type="button" className="px-8 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800" onClick={() => {
                        const action = {
                            type: SET_FILM_DANG_CHIEU,
                        }
                        dispatch(action)
                        console.log(arrPhim);
                    }}>Phim Đang Chiếu</button>
                    <button type="button" className="px-8 py-3 font-semibold rounded-full dark:bg-gray-100 dark:text-gray-800" onClick={() => {
                        const action = {
                            type: SET_FILM_SAP_CHIEU,
                        }
                        dispatch(action);
                        console.log(arrPhim);
                    }}>Phim Sắp Chiếu</button>
                </div>
                <section className="text-gray-600 body-font " >
                    <div className="container px-5 py-24 mx-auto" >
                        <div className="flex flex-wrap   " style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {arrPhim.map((item, index) => {
                                return <Film_Flip key={index} item={item} />

                            })}

                        </div>
                    </div>
                </section>

                <div className='mx-36'>
                    <HomeMenu heThongRapChieu={heThongRapChieu} />
                </div>
            </div>
        </div>
    )
}
