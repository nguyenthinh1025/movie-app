import axios from "axios"
import { http } from "../../services/baseServices";
import { SET_CHI_TIET_PHIM, SET_HE_THONG_RAP_PHIM } from "./type/QuanLyRapType";



export const QuanLyRapAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get('/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=GP00');
            const action = {
                type: SET_HE_THONG_RAP_PHIM,
                heThongRapChieu: result.data.content,
            }

            dispatch(action);
            console.log(result.data.content);
        } catch (error) {
            console.log(error.reponse?.data);
        }
    }
}

export const layChiTietPhim = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await http.get('/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=' + maPhim)

            const action = {
                type: SET_CHI_TIET_PHIM,
                maPhim: result.data.content,
            }
            dispatch(action);
        } catch (error) {
            console.log(error.reponse?.data);
        }
    }
}