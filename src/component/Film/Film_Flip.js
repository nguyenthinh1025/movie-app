import React from 'react'
import { NavLink } from 'react-router-dom';
import './Film_Flip.css';
export default function Film_Flip (props) {
    const { item } = props;
    return (
        <div>
            <div className="hero-container">
                <div className="main-container">
                    <div className="poster-container">
                        <a href="#"><img src={item.hinhAnh} className="poster" /></a>
                    </div>
                    <div className="ticket-container">
                        <div className="ticket__content">
                            <h4 className="ticket__movie-title">{item.tenPhim}</h4>
                            <p className="ticket__movie-slogan">
                                {item.moTa}
                            </p>
                            <p className="ticket__current-price">$28.00</p>
                            <p className="ticket__old-price">$44.99</p>
                            <div className='w-full'>
                                <NavLink to={`detail/${item.maPhim}`} className="ticket__buy-btn">Chi Tiết</NavLink>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>


    )
}
