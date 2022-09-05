import { history } from "../../App";
import { http } from "../../services/baseServices"

export const QuanLyPhimAction = () => {
    return async (dispatch) => {
        try {
            let result = await http.get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP00');

            const action = {
                type: 'LAY_DANH_SACH_PHIM',
                arrPhim: result.data.content
            }
            dispatch(action);
            console.log(action);
        } catch (error) {
            console.log(error.reponse?.data);
        }
    }
}
export const QuanLyPhimAction1 = (tenPhim) => {
    return async (dispatch) => {
        try {
            let result = await http.get('/api/QuanLyPhim/LayDanhSachPhim?maNhom=GP00&tenPhim=' + tenPhim);

            const action = {
                type: 'LAY_DANH_SACH_PHIM',
                arrPhim: result.data.content
            }
            dispatch(action);
            console.log(action);
        } catch (error) {
            console.log(error.reponse?.data);
        }
    }
}

export const themPhimUploadHinh = (formData) => {
    return async (dispatch) => {
        try {
            let result = await http.post('/api/QuanLyPhim/ThemPhimUploadHinh', formData);
            alert('Thêm Phim Thành Công');
            console.log(result.data.content);
        } catch (error) {
            console.log(error);
        }
    }
}

export const layThongTinPhim = (maPhim) => {
    return async (dispatch) => {
        try {
            let result = await http.get('/api/QuanLyPhim/LayThongTinPhim?MaPhim=' + maPhim);
            const action = {
                type: 'LAY_THONG_TIN_PHIM',
                thongTinPhim: result.data.content
            }
            dispatch(action);

        } catch (error) {
            console.log(error);
        }
    }
}

export const capNhatPhimUpload = (upload) => {

    return async (dispatch) => {
        try {
            let result = await http.post('/api/QuanLyPhim/CapNhatPhimUpload', upload);
            alert('Cập Nhật Phim Thành Công')
            console.log(result.data.content);
            dispatch(QuanLyPhimAction())
            history.push('/admin/films')
        } catch (error) {
            console.log(error);
        }
    }
}



export const xoaPhimAction = (maPhim) => {

    return async (dispatch) => {
        try {
            let result = await http.delete('/api/QuanLyPhim/XoaPhim?MaPhim=' + maPhim);
            alert('Xóa Phim Thành Công');
            dispatch(QuanLyPhimAction())

        } catch (error) {
            console.log(error);
        }
    }
}