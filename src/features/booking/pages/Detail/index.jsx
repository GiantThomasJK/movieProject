import {
  fecthCinemasAction,
  fetchMovieDetailAction,
  fetchMovieSchedule,
  fetchMovieScheduleAction,
} from "features/booking/action";
import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Col, Row, Card, Button } from "antd";
import { formatDate } from "common/utils/date";

function Detail() {
  //lay url
  const match = useRouteMatch();
  const movieId = match.params.id;

  const dispatch = useDispatch();
  const selectedMovie = useSelector((state) => state.booking.selectedMovie);
  const selectedCinemas = useSelector((state) => state.booking.cinemas);
  const selectedSchedules = useSelector((state) => state.booking.schedules);

  const fetchMovieDetail = async () => {
    //1.len url =>ma phim
    //2.viet async action fetchMovieDetailAction
    //3.dispatch async action
    //4.len store, tao them 1 du lieu moi , xu ly action
    //5.lay selectedMovie va hien ra man hinh

    await dispatch(fetchMovieDetailAction(movieId));
  };

  const fetchCinemas = async () => {
    const data = await dispatch(fecthCinemasAction);
    fetchSchedules(data[0].maHeThongRap);
  };

  const fetchSchedules = (id) => {
    dispatch(fetchMovieScheduleAction(id));
  };

  useEffect(() => {
    fetchMovieDetail();
    fetchCinemas();
    //phai doi cinema load xong moi goi lich chieu
  }, []);

  if (!selectedMovie) {
    return <Spin />;
  }

  if (!selectedCinemas) {
    return <Spin />;
  }

  return (
    <div className="container">
      {/* useEffect chay sau render nen chua co API nen ko . xai thuoc tinh dc */}
      <h1>{selectedMovie.tenPhim}</h1>
      <img style={{ width: 100 }} src={selectedMovie.hinhAnh} alt="" />
      <p>{selectedMovie.moTa}</p>

      <Row gutter={10}>
        {selectedCinemas?.map((item) => {
          return (
            <Col
              style={{ textAlign: "center" }}
              key={item.maHeThongRap}
              xs={24}
              sm={12}
              md={8}
              lg={4}
            >
              <h3>{item.tenHeThongRap}</h3>
              <img height={50} width={50} src={item.logo} alt="" />
            </Col>
          );
        })}
      </Row>

      {/* <Row style={{ marginTop: 50 , marginBottom: 50}} gutter={10}>
        {selectedSchedules?.lstCumRap.map((item) => {
          return (
            <Col
              style={{ textAlign: "center" }}
              key={item.maCumRap}
              xs={24}
              sm={12}
              md={8}
              lg={4}
            >
              <h3>{item.tenCumRap}</h3>
              <p>{item.diaChi}</p>
              <img style={{ width: 100 }} src={item.hinhAnh} alt="" />
            </Col>
          );
        })}
      </Row> */}

      {selectedSchedules?.lstCumRap.map((item) => {
        const currentMovie = item.danhSachPhim.find(
          (movie) => movie.maPhim.toString() === movieId
        );

        if (!currentMovie) return null;
        return (
          <Card style={{ margin: 20, background: "#000", color: "#fff" }}>
            <img src={item.hinhAnh} alt="" />
            <p style={{ fontSize: 20 }}>{item.tenCumRap}</p>
            {/* List cac lich chieu */}
            {currentMovie.lstLichChieuTheoPhim.map((show) => {
              return (
                <Button
                  style={{
                    marginRight: 20,
                    background: "#0068ff",
                    color: "white",
                    borderRadius: 8,
                    borderColor: "transparent"
                  }}
                  type="default"
                >
                  {formatDate(show.ngayChieuGioChieu)}
                </Button>
              );
            })}
          </Card>
        );
      })}

      {selectedMovie.trailer.startsWith("https") && (
        <iframe
          width="930"
          height="523"
          src={selectedMovie.trailer}
          title={selectedMovie.tenPhim}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
}

export default Detail;
