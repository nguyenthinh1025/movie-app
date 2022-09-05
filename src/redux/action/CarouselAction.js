import axios from "axios"
import { http } from "../../services/baseServices"
import { DOMAIN, TOKENCYBERSOFT } from "../../util/setting"
import { LAY_DANH_SACH_BANNER } from "./type/CarouselType"



export const getCarouselAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get('/api/QuanLyPhim/LayDanhSachBanner');

            const action = {
                type: LAY_DANH_SACH_BANNER,
                arrCarousel: result.data.content,
            }


            dispatch(action);
        } catch (error) {
            console.log(error.reponse?.data);
        }
    }
}