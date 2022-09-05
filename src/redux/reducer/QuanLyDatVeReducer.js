import { ThongTinLichChieu } from "../../_core/models/ThongTinPhongVe";
import { CHUYEN_TAB, DANH_SACH_GHE_DANG_DAT, DAT_VE, DAT_VE_HOAN_TAT } from "../action/type/QuanLyDatVeType";

const stateDefault = {
    chiTietPhongVe: new ThongTinLichChieu(),
    danhSachGheDangDat: [],
    tabActive: '1',
    danhSachGheKhachDat: []
}

export const QuanLyDatVeReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case DAT_VE: {
            state.chiTietPhongVe = action.chiTietPhongVe;
            return { ...state };
        }
        case DANH_SACH_GHE_DANG_DAT: {
            let danhSachGheCapNhat = [...state.danhSachGheDangDat];
            let index = danhSachGheCapNhat.find(gheDD => gheDD.maGhe === action.danhSachGheDangDat.maGhe);
            if (index) {
                danhSachGheCapNhat = danhSachGheCapNhat.filter(xoa => xoa.maGhe !== action.danhSachGheDangDat.maGhe);
            }
            else {
                danhSachGheCapNhat.push(action.danhSachGheDangDat)
            }
            state.danhSachGheDangDat = danhSachGheCapNhat;
            return { ...state }
        }

        case DAT_VE_HOAN_TAT: {
            state.danhSachGheDangDat = [];
            return { ...state };
        }

        case CHUYEN_TAB: {
            state.tabActive = '2';
            return { ...state };
        }

        case 'CHANGE_TAB_ACTIVE': {
            state.tabActive = action.number;
            return { ...state }
        }

        case 'DAT_GHE': {
            state.danhSachGheKhachDat = action.arrGheKhachDat;
            return { ...state };
        }
        default: return state;
    }
}