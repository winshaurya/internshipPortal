import { api } from "./api";

export const jobApi = api.injectEndpoints({
  endpoints: (build) => ({
    listJobsForStudent: build.query({
      query: (params) => ({ url: "/job/get-all-jobs-student", params }),
      providesTags: ["Jobs"],
    }),
    jobDetails: build.query({
      query: (id) => `/job/get-job-by-id-student/${id}`,
    }),
    applyToJob: build.mutation({
      query: (body) => ({ url: "/job/apply-job", method: "POST", body }),
      invalidatesTags: ["Applications"],
    }),
    createJob: build.mutation({
      query: (body) => ({ url: "/job/post-job", method: "POST", body }),
      invalidatesTags: ["Jobs"],
    }),
    listApplicants: build.query({
      query: (jobId) => `/job/view-applicants/${jobId}`,
      providesTags: ["Applications"],
    }),
  }),
});

export const {
  useListJobsForStudentQuery,
  useJobDetailsQuery,
  useApplyToJobMutation,
  useCreateJobMutation,
  useListApplicantsQuery,
} = jobApi;
