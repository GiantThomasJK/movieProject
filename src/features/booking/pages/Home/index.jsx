import instance from "api/instance";
import axios from "axios";
import MovieList from "features/booking/components/MovieList";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Pagination } from "antd";
import { fecthMoviesAction } from "features/booking/action";

function Home() {
  const dispatch = useDispatch();
  const [config, setConfig] = useState({
    currentPage: 1,
    pageSize: 4,
    totalCount: 0,
  });

  const changeTotalCount = (total) => {
    setConfig({ ...config, totalCount: total });
  };

  const fetchMovies = async () => {
    dispatch(fecthMoviesAction(config, changeTotalCount));
  };

  const handleChangePage = (page) => {
    setConfig({ ...config, currentPage: page });
  };

  useEffect(() => {
    fetchMovies();
  }, [config.currentPage]);

  return (
    <div>
      <h1 style={{ textAlign: "center", fontSize: 40 }}>Danh sách phim</h1>
      <MovieList />
      <Pagination
        style={{ display: "flex", justifyContent: "center", marginTop: 40 }}
        onChange={handleChangePage}
        current={config.currentPage}
        pageSize={config.pageSize}
        total={config.totalCount}
      />
      <h2>{config.currentPage} </h2>
      <h2>{config.pageSize} </h2>
      <h2>{config.totalCount} </h2>
    </div>
  );
}

export default Home;
