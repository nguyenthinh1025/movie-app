import { http } from "../../services/baseServices";
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG } from "./type/QuanLyNguoiDungType";
import { history } from './../../App'


export const DangNhapAction = (thongtinDangNhap) => {

    return async (dispatch) => {
        try {
            let result = await http.post('/api/QuanLyNguoiDung/DangNhap', thongtinDangNhap);

            if (result.data.statusCode === 200) {
                const action = {
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                }
                dispatch(action);
                history.goBack();
            }
            console.log(result);
        } catch (error) {
            console.log(error.reponse?.data);
        }
    }
}

export const layThongTinNguoiDung = (thongtinDangNhap) => {

    return async (dispatch) => {
        try {
            let result = await http.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan', thongtinDangNhap);

            if (result.data.statusCode === 200) {
                const action = {
                    type: SET_THONG_TIN_NGUOI_DUNG,
                    thongTinNguoiDung: result.data.content
                }
                dispatch(action);

            }
            console.log(result);
        } catch (error) {
            console.log(error.reponse?.data);
        }
    }
}