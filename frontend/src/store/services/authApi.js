import { api } from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    registerStudent: build.mutation({
      query: (body) => ({ url: "/auth/register-student", method: "POST", body }),
    }),
    registerAlumni: build.mutation({
      query: (body) => ({ url: "/auth/register-alumni", method: "POST", body }),
    }),
    getProfile: build.query({
      query: () => "/student/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: build.mutation({
      query: (body) => ({ url: "/student/profile", method: "PUT", body }),
      invalidatesTags: ["Profile"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterStudentMutation,
  useRegisterAlumniMutation,
  useGetProfileQuery,
  useUpdateProfileMutation,
} = authApi;
