import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import UpdateModal from "../components/upadateModal/UpdateModal";
import {
  useCreateUsersMutation,
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
  useGetSingleUserQuery,
} from "../context/api/userApi";
import { Link } from "react-router-dom";

const Home = () => {
  const [updateUserItem, setUpdateUserItem] = useState(null);
  const { isLoading, data } = useGetUsersQuery();

  const [createUser, { isLoading: createLoading }] = useCreateUsersMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateuser, { isLoading: updataLoading }] = useUpdateUserMutation();

  const handleCreateUser = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);

    let userData = Object.fromEntries(formData.entries());

    createUser(userData)
      .unwrap()
      .then(() => {
        e.target.reset();
      });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let userData = Object.fromEntries(formData.entries());

    updateuser({ id: updateUserItem.id, body: userData })
      .unwrap()
      .then(() => {
        setUpdateUserItem(null);
      });
  };

  return (
    <div className="flex  justify-between">
      <div className="w-[400px] p-3 border-r bg-yellow-400 text-white h-screen sticky left-0 top-0">
        <form onSubmit={handleCreateUser} className="flex flex-col gap-4">
          <label htmlFor="fname" className="flex flex-col gap-2 text-sm">
            First name
            <input
              type="text"
              name="fname"
              id="fname"
              placeholder="First name"
              required
              className="border border-yellow-500 text-gray-800 text-sm px-3 py-2 rounded-lg focus:outline-dashed"
            />
          </label>

          <label htmlFor="lname" className="flex flex-col gap-2 text-sm">
            Last name
            <input
              type="text"
              name="lname"
              id="lname"
              placeholder="Last name"
              required
              className="border border-yellow-500 text-gray-800 text-sm px-3 py-2 rounded-lg focus:outline-dashed"
            />
          </label>
          <label htmlFor="job" className="flex flex-col gap-2 text-sm">
            Job
            <input
              type="text"
              id="job"
              name="job"
              placeholder="Job"
              required
              className="border border-yellow-500 text-gray-800 text-sm  px-3 py-2 rounded-lg focus:outline-dashed"
            />
          </label>
          <label htmlFor="gender" className="flex flex-col gap-2 text-sm">
            Select gender
            <div className="grid relative">
              <select
                name="gender"
                id="gender"
                required
                className="border border-yellow-500 text-gray-800 text-sm px-3 py-2 focus:outline-dashed rounded-lg appearance-none row-start-1 col-start-1 bg-white"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              <FaChevronDown className="pointer-events-none row-start-1 col-start-1 absolute right-2.5 top-3 text-xs" />
            </div>
          </label>

          <label htmlFor="bio" className="flex flex-col gap-2 text-sm">
            You bio
            <textarea
              name="bio"
              required
              rows={5}
              id="bio"
              className="border border-yellow-500 text-gray-800 row-auto rounded-lg p-2 focus:outline-dashed"
            ></textarea>
          </label>

          <button
            className="p-2 text-lg text-white rounded-lg bg-yellow-300 border-b-4 border-yellow-500 active:border-b-yellow-300 focus:outline-dashed"
            type="submit"
          >
            {createLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-white fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Create"
            )}
          </button>
        </form>
      </div>

      <div className="container py-4 ml-10">
        <div className="flex flex-col items-start justify-start">
          <h2 className="text-4xl font-bold uppercase mb-10">Users</h2>
          {isLoading && <h3>Loading...</h3>}
          <div className="grid grid-cols-5 gap-6 w-full">
            {Array.isArray(data) &&
              data.map((user, inx) => (
                <div
                  key={`${user.id}-${inx}`}
                  className="group flex flex-col items-center justify-center overflow-hidden text-wrap gap-2 hover:shadow-3xl transition-all ease-in-out duration-200 cursor-pointer p-4 rounded-2xl"
                >
                  <Link to={`/user/${user.id}`}>
                    <img src={user.gender === "male" ? "/man.png" : "/woman.png"} alt={""} width={100} />
                  </Link>
                  <Link to={`/user/${user.id}`}>
                    <h2 className="group-hover:underline underline-offset-2 text-lg text-start font-bold text-wrap">
                      {user.fname}
                    </h2>
                  </Link>
                  <p className="text-sm text-center">{user.job}</p>
                  <p className="line-clamp-2 text-sm font-thin text-center">{user.bio}</p>

                  <div className="grid grid-cols-2 items-center justify-between gap-2 mt-4">
                    <button
                      onClick={() => {
                        deleteUser(user.id);
                        console.log(user);
                      }}
                      className="bg-yellow-400 p-2 px-3 rounded-md text-white text-center text-xs opacity-0 group-hover:opacity-100 transition-all ease-in duration-75"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setUpdateUserItem(user);
                      }}
                      className="bg-yellow-400 p-2 px-3 rounded-md text-white text-xs opacity-0 group-hover:opacity-100 transition-all ease-in duration-75"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {updateUserItem ? (
        <UpdateModal close={() => setUpdateUserItem(null)}>
          <form onSubmit={handleUpdateUser} className="flex flex-col gap-4">
            <label htmlFor="fname" className="flex flex-col gap-2 text-sm">
              First name
              <input
                type="text"
                name="fname"
                id="fname"
                defaultValue={updateUserItem.fname}
                placeholder="First name"
                required
                className="border border-yellow-500 text-gray-800 text-sm px-3 py-2 rounded-lg focus:outline-dashed"
              />
            </label>

            <label htmlFor="lname" className="flex flex-col gap-2 text-sm">
              Last name
              <input
                type="text"
                name="lname"
                id="lname"
                defaultValue={updateUserItem.lname}
                placeholder="Last name"
                required
                className="border border-yellow-500 text-gray-800 text-sm px-3 py-2 rounded-lg focus:outline-dashed"
              />
            </label>
            <label htmlFor="job" className="flex flex-col gap-2 text-sm">
              Job
              <input
                type="text"
                id="job"
                name="job"
                placeholder="Job"
                required
                defaultValue={updateUserItem.job}
                className="border border-yellow-500 text-gray-800 text-sm  px-3 py-2 rounded-lg focus:outline-dashed"
              />
            </label>
            <label htmlFor="gender" className="flex flex-col gap-2 text-sm">
              Select gender
              <div className="grid relative">
                <select
                  name="gender"
                  id="gender"
                  required
                  defaultValue={updateUserItem.gender}
                  className="border border-yellow-500 text-gray-800 text-sm px-3 py-2 focus:outline-dashed rounded-lg appearance-none row-start-1 col-start-1 bg-white"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <FaChevronDown className="pointer-events-none row-start-1 col-start-1 absolute right-2.5 top-3 text-xs" />
              </div>
            </label>

            <label htmlFor="bio" className="flex flex-col gap-2 text-sm">
              You bio
              <textarea
                name="bio"
                required
                rows={5}
                id="bio"
                defaultValue={updateUserItem.bio}
                className="border border-yellow-500 text-gray-800 row-auto rounded-lg p-2 focus:outline-dashed"
              ></textarea>
            </label>

            <button
              className="p-2 text-lg rounded-lg bg-white text-yellow-400 border-b-4 border-yellow-500 active:border-b-yellow-300 focus:outline-dashed"
              type="submit"
            >
              {updataLoading ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-6 h-6 text-gray-200 animate-spin dark:text-yellow-400 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                "Update"
              )}
            </button>
          </form>
        </UpdateModal>
      ) : null}
    </div>
  );
};

export default Home;
