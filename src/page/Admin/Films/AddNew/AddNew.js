import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
} from 'antd';
import { Formik, useFormik } from 'formik';
import moment from 'moment';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { themPhimUploadHinh } from '../../../../redux/action/QuanLyPhimAction';

export default function AddNew () {
    const dispatch = useDispatch()
    const [img, setImg] = useState('');
    const fromik = useFormik({
        initialValues: {
            tenPhim: '',
            trailer: '',
            moTa: '',
            ngayKhoiChieu: '',
            dangChieu: false,
            sapChieu: false,
            hot: false,
            danhGia: 0,
            hinhAnh: {},
            maNhom: '',

        },
        onSubmit: (value) => {
            console.log(value);
            value.maNhom = 'GP00';
            let formData = new FormData();
            for (let key in value) {
                if (key !== 'hinhAnh') {
                    formData.append(key, value[key])
                }
                else {
                    formData.append('File', value.hinhAnh, value.hinhAnh.name);
                }
            }
            console.log(formData);
            const action = themPhimUploadHinh(formData);
            dispatch(action);
        }
    })

    const handleChangeDatePicker = (value) => {
        const ngayKhoiChieu = moment(value).format('DD/MM/YYYY');
        fromik.setFieldValue('ngayKhoiChieu', ngayKhoiChieu)
    }
    const hadleChangeSwitch = (name) => {
        return (value) => {
            fromik.setFieldValue(name, value);
        }
    }
    const handleChangeFile = (e) => {
        let file = e.target.files[0];
        console.log(file);
        if (file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/gif' || file.type === 'image/png') {

            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                console.log(e.target.result);
                setImg(e.target.result);
            }
            fromik.setFieldValue('hinhAnh', file)
        }
    }
    return (
        <Form
            onSubmitCapture={fromik.handleSubmit}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
        // initialValues={{ size: componentSize }}
        // onValuesChange={onFormLayoutChange}
        // size={componentSize}
        >
            <h3> Th??m M???i Phim</h3>
            <Form.Item label="T??n phim">
                <Input name='tenPhim' onChange={fromik.handleChange} />
            </Form.Item>
            <Form.Item label="Trailer">
                <Input name='trailer' onChange={fromik.handleChange} />
            </Form.Item>
            <Form.Item label="M?? T???">
                <Input name='moTa' onChange={fromik.handleChange} />
            </Form.Item>
            <Form.Item label="Ng??y Kh???i Chi???u">
                <DatePicker format={'DD/MM/YYYY'} onChange={handleChangeDatePicker} />
            </Form.Item>
            <Form.Item label="??ang Chi???u" >
                <Switch name='dangChieu' onChange={hadleChangeSwitch('dangChieu')} />
            </Form.Item>
            <Form.Item label="S???p Chi???u" >
                <Switch name='sapChieu' onChange={hadleChangeSwitch('sapChieu')} />
            </Form.Item>
            <Form.Item label="Hot" >
                <Switch name='hot' onChange={hadleChangeSwitch('hot')} />
            </Form.Item>
            <Form.Item label="S??? Sao">
                <InputNumber onChange={(value) => { fromik.setFieldValue('danhGia', value) }} min={1} max={10} />
            </Form.Item>
            <Form.Item label="H??nh ???nh">
                <input type='file' onChange={handleChangeFile} accept='image/png,image/jpeg,image/gif,image/png' />
                <img style={{ width: 150, height: 150 }} src={img} />
            </Form.Item>
            <Form.Item label="T??c V???">
                <button type='submit' className='bg-blue-300 text-white p-2'>Th??m Films</button>
            </Form.Item>
        </Form>
    );


}



