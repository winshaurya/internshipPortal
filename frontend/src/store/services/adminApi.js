import { api } from "./api";

export const adminApi = api.injectEndpoints({
  endpoints: (build) => ({
    adminAnalytics: build.query({
      query: () => "/admin/analytics",
      providesTags: ["AdminAnalytics"],
    }),
    searchStudents: build.query({
      query: (params) => ({ url: "/search/students", params }),
    }),
    searchAlumni: build.query({
      query: (params) => ({ url: "/search/alumni", params }),
    }),
    adminJobs: build.query({
      query: () => "/admin/jobs",
    }),
    viewApplicantsForJob: build.query({
      query: (jobId) => `/job/view-applicants/${jobId}`,
    }),
    listUsers: build.query({
      query: () => "/admin/users",
    }),
    toggleUser: build.mutation({
      query: (body) => ({ url: "/admin/user-status", method: "PUT", body }),
      invalidatesTags: ["AdminAnalytics"],
    }),
  }),
});

export const {
  useAdminAnalyticsQuery,
  useSearchStudentsQuery,
  useSearchAlumniQuery,
  useAdminJobsQuery,
  useViewApplicantsForJobQuery,
  useLazyViewApplicantsForJobQuery,
  useListUsersQuery,
  useToggleUserMutation,
} = adminApi;
