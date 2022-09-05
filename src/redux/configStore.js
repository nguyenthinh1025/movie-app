import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import reduxThunk from 'redux-thunk';
import { CarouselReducer } from './reducer/CarouselReducer';
import { LoadingReducer } from './reducer/LoadingReducer';
import { QuanLyDatVeReducer } from './reducer/QuanLyDatVeReducer';
import { quanLynguoiDungReducer } from './reducer/QuanLyNguoiDungReducer';
import { QuanLyPhimReducer } from './reducer/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducer/QuanLyRapReducer';


const rootReducer = combineReducers({
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    quanLynguoiDungReducer,
    QuanLyDatVeReducer,
    LoadingReducer,
})

let middleWare = applyMiddleware(reduxThunk);
let composeCustom = compose(middleWare, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const store = createStore(rootReducer, composeCustom);