import { connection } from "../..";
import { http } from "../../services/baseServices"
import { ThongTinDatVe } from "../../_core/models/ThongTinDatVe";
import { displayLoadingAction, hideLoadingAction } from "./LoadingAction";
import { HIDE_LOADING } from "./type/LoadingType";
import { CHUYEN_TAB, DANH_SACH_GHE_DANG_DAT, DAT_VE, DAT_VE_HOAN_TAT } from "./type/QuanLyDatVeType";



export const QuanLyDatVeAction = (maLichChieu) => {
    return async (dispatch) => {

        try {
            let result = await http.get('/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=' + maLichChieu);
            const action = {
                type: DAT_VE,
                chiTietPhongVe: result.data.content,
            }
            console.log(result.data.content);
            dispatch(action);
        } catch (error) {
            console.log(error);
        }
    }
}

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async (dispatch, getState) => {

        try {
            dispatch(displayLoadingAction)

            let result = await http.post('/api/QuanLyDatVe/DatVe', thongTinDatVe);
            console.log(result.data.content);
            await dispatch(QuanLyDatVeAction(thongTinDatVe.maLichChieu));
            await dispatch({ type: DAT_VE_HOAN_TAT })
            await dispatch(hideLoadingAction)
            let taiKhoan = getState().quanLynguoiDungReducer.userLogin.taiKhoan;
            connection.invoke('datGheThanhCong', taiKhoan, thongTinDatVe.maLichChieu)
            dispatch({ type: CHUYEN_TAB })

        } catch (error) {
            dispatch(hideLoadingAction)
            console.log(error);
        }
    }
}

export const datGheAction = (ghe, maLichchieu) => {
    return async (dispatch, getState) => {

        try {
            dispatch({
                type: DANH_SACH_GHE_DANG_DAT,
                danhSachGheDangDat: ghe,
            })
            let danhSachGheDangDat = getState().QuanLyDatVeReducer.danhSachGheDangDat;
            let taiKhoan = getState().quanLynguoiDungReducer.userLogin.taiKhoan;
            console.log(danhSachGheDangDat, taiKhoan, maLichchieu);
            danhSachGheDangDat = JSON.stringify(danhSachGheDangDat);
            connection.invoke('datGhe', taiKhoan, danhSachGheDangDat, maLichchieu);
        } catch (error) {

            console.log(error);
        }
    }
}