import { USER_LOGIN } from "../../util/setting";
import { DANG_NHAP_ACTION, SET_THONG_TIN_NGUOI_DUNG, TOKEN_USER } from "../action/type/QuanLyNguoiDungType";



let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
    userLogin: user,
    thongTinNguoiDung: {

    }
}

export const quanLynguoiDungReducer = (state = stateDefault, action) => {

    switch (action.type) {
        case DANG_NHAP_ACTION: {
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.thongTinDangNhap));
            localStorage.setItem(TOKEN_USER, action.thongTinDangNhap.accessToken)
            return { ...state, userLogin: action.thongTinDangNhap }
        }
        case SET_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return { ...state };
        }

        default: return state;
    }
}