import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../../context/api/userApi";

const DetailPage = () => {
  const { id } = useParams();

  const { data: user, isLoading: userLoading } = useGetSingleUserQuery(id) || {};

  return (
    <div key={id}>
      <img src={user?.gender !== "male" ? "/public/woman.png" : "/public/man.png"} alt="" width={400} />
    </div>
  );
};

export default DetailPage;
