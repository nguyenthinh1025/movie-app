import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Carousel } from 'antd';
import { getCarouselAction } from '../../../../redux/action/CarouselAction';

const contentStyle = {
    height: '400px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    backgroundPosition: 'center',
    backgroundSize: '100%',
    backgroundRepeat: 'no-repeat'
};
export default function HomeCarousel (props) {
    const dispatch = useDispatch();

    useEffect(() => {
        const action = getCarouselAction();
        dispatch(action);
    }, []);

    const carousel = useSelector(rootReducer => rootReducer.CarouselReducer.arrCarousel);

    return (
        <Carousel effect="fade" >
            {carousel.map((item, index) => {
                return <div key={index}>
                    <div style={{ ...contentStyle }}>
                        <img src={item.hinhAnh} className='w-full' />
                    </div>
                </div>
            })}
            {/* <div>
                <div style={contentStyle}>
                    <img src='https://i.pravatar.cc?u=123' />
                </div>
            </div>
            <div>
                <div style={contentStyle}>
                    <img src='https://i.pravatar.cc?u=124' />
                </div>
            </div>
            <div>
                <div style={contentStyle}>
                    <img src='https://i.pravatar.cc?u=125' />
                </div>
            </div> */}
        </Carousel>
    )
}
