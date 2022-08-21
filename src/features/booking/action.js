//asycn action
import instance from "api/instance";

export const actionTypes = {
  SET_MOVIES: "booking/SET_MOVIES",
  SET_MOVIES_DETAIL: "booking/SET_MOVIES_DETAIL",
  SET_CINEMAS: "booking/SET_CINEMAS",
  SET_SCHEDULES: "booking/SET_SCHEDULES"

};

export const fecthMoviesAction = (config, cb) => {
  return async (dispatch) => {
    try {
      console.log("call api thunk");
      const res = await instance.request({
        url: "api/QuanLyPhim/LayDanhSachPhimPhanTrang",
        method: "GET",
        params: {
          maNhom: "GP02",
          soTrang: config.currentPage,
          soPhanTuTrenTrang: config.pageSize,
        },
      });

      // setConfig({ ...config, totalCount: res.data.content.totalCount });
      cb(res.data.content.totalCount);
      dispatch({
        type: actionTypes.SET_MOVIES,
        payload: res.data.content,
      });
    } catch (err) {}
  };
};

export const fetchMovieDetailAction = (movieId) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyPhim/LayThongTinPhim",
        method: "GET",
        params: {
          MaPhim: movieId,
        },
      });

      dispatch({
        type: actionTypes.SET_MOVIES_DETAIL,
        payload: res.data.content,
      });
    } catch (err){}
  };
};

export const fecthCinemasAction = async (dispatch) =>{
  try {
    const res = await instance.request({
      url: "/api/QuanLyRap/LayThongTinHeThongRap",
      method: "GET",
    });

    dispatch({
      type: actionTypes.SET_CINEMAS,
      payload: res.data.content,
    });

    return res.data.content;
  } catch (err){}
}

export const fetchMovieScheduleAction = (id) => {
  return async (dispatch) => {
    try {
      const res = await instance.request({
        url: "/api/QuanLyRap/LayThongTinLichChieuHeThongRap",
        method: "GET",
        params: {
          maHeThongRap: id,
          maNhom: "GP02",
        },
      });

      dispatch({
        type: actionTypes.SET_SCHEDULES,
        payload: res.data.content,
      });
    } catch (err){}
  };
}

