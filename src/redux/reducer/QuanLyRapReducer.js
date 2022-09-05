import { SET_HE_THONG_RAP_PHIM } from "../action/type/QuanLyRapType";

const stateDefault = {
    heThongRapChieu: []
}


export const QuanLyRapReducer = (state = stateDefault, action) => {

    switch (action.type) {

        case SET_HE_THONG_RAP_PHIM: {
            state.heThongRapChieu = action.heThongRapChieu;
            return { ...state };
        }
        default: return state;
    }
}