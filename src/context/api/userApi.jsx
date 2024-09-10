import { api } from "./index";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: ({ pageSize, limit }) => ({
        url: `/users?page=${pageSize}&limit=${limit}`,
      }),
      providesTags: ["Users"],
    }),
    createUsers: build.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
    getSingleUser: build.query({
      query: (id) => ({
        url: `/users/${id}`,
      }),
      providesTags: ["Users"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: build.mutation({
      query: ({ id, body }) => ({
        url: `users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const { useCreateUsersMutation, useGetUsersQuery, useDeleteUserMutation, useUpdateUserMutation, useGetSingleUserQuery } =
  userApi;
