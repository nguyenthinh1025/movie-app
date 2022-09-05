import _ from "lodash";
import { SET_FILM_DANG_CHIEU, SET_FILM_SAP_CHIEU } from "../action/type/QuanLyPhimType";
import { SET_CHI_TIET_PHIM } from "../action/type/QuanLyRapType";

const stateDefault = {
    arrPhim: [{
        "maPhim": 9662,
        "tenPhim": "The Tomorrow War 2",
        "biDanh": "the-tomorrow-war-2",
        "trailer": "https://youtu.be/QPistcpGB8o",
        "hinhAnh": "https://movienew.cybersoft.edu.vn/hinhanh/the-tomorrow-war_gp01.png",
        "moTa": "Cuộc chiến tương lai (The Tomorrow War) là bộ phim hành động khoa học viễn tưởng chiến tranh của Mỹ, sản xuất năm 2021 do Chris McKay đạo diễn, phụ trách hình ảnh do David Ellison, Dana Goldberg, Don Granger, David S. Goyer, Jules Daly và Adam Kolbrenner sản xuất, với kịch bản được viết bởi Zach Dean. Dàn diễn viên của bộ phim dự kiến bao gồm Chris Pratt (nổi tiếng với vai Star-Lord trong Vệ binh dải Ngân hà), Yvonne Strahovski, J.K. Simmons, Betty Gilpin, Sam Richardson, Edwin Hodge, Jasmine Mathews, Ryan Kiera Armstrong và Keith Powers.",
        "maNhom": "GP01",
        "ngayKhoiChieu": "2022-08-21T17:04:08.723",
        "danhGia": 10,
        "hot": true,
        "dangChieu": false,
        "sapChieu": true
    }],
    dangChieu: true,
    sapChieu: true,
    arrPhimDefault: [],
    filmDetail: [],
    thongTinPhim: {}
}

export const QuanLyPhimReducer = (state = stateDefault, action) => {

    switch (action.type) {
        case 'LAY_DANH_SACH_PHIM': {
            state.arrPhim = action.arrPhim;
            state.arrPhimDefault = state.arrPhim;
            return { ...state };
        }
        case SET_FILM_DANG_CHIEU: {
            let setPhim = [...state.arrPhim]
            state.arrPhim = _.filter(setPhim, item => item.dangChieu === true);
            return { ...state };
        }
        case SET_FILM_SAP_CHIEU: {
            let setPhimSAPChieu = [...state.arrPhimDefault]
            state.arrPhim = _.filter(setPhimSAPChieu, item => item.sapChieu === true);
            return { ...state };
        }
        case SET_CHI_TIET_PHIM: {
            state.filmDetail = action.maPhim;
            return { ...state };
        }
        case 'LAY_THONG_TIN_PHIM': {
            state.thongTinPhim = action.thongTinPhim;
            return { ...state };
        }
        default: return state
    }
}