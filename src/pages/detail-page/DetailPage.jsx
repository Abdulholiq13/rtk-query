import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleUserQuery } from "../../context/api/userApi";

const DetailPage = () => {
  const { id } = useParams();

  const { data: user, isLoading: userLoading } = useGetSingleUserQuery(id) || {};

  const navigate = useNavigate();

  return (
    <>
      {user ? (
        <div className="grid grid-cols-2 container h-screen place-items-center">
          <div>
            <img src={user?.gender !== "male" ? "/public/woman.png" : "/public/man.png"} alt="" width={400} />
          </div>
          <div>
            <h2 className="text-2xl">
              <span className="font-semibold">Full name: </span> {user?.fname} {user?.lname}
            </h2>
            <p className="text-xl">
              <span className="font-semibold">Full work: </span> {user?.job}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Biography: </span> {user?.bio}
            </p>
            <p className="text-xl">Gender: {user?.gender}</p>
            <div className="mt-10 flex gap-4">
              <button
                onClick={() => navigate(-1)}
                className="bg-yellow-400 p-3 px-4 rounded-md text-white text-center text-base transition-all ease-in duration-75 capitalize"
              >
                Go Back
              </button>
              <button
                onClick={() => navigate("/")}
                className="bg-yellow-400 p-3 px-4 rounded-md text-white text-center text-base transition-all ease-in duration-75 capitalize"
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default DetailPage;
