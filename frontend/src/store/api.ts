import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import {
  IResponseRegister,
  IUser,
  IRegister,
  IService,
  IProject,
  IBlogPost,
  IResponseApi,
  IQuoteRequest,
  IContact,
  IFormation,
  ICareerInfo,
  ICareer,
  IModule,
  IInsriptionModule,
  IEvent,
  IEventEnrollment
} from "./interface";
import { Mutex } from "async-mutex";
import { setToken } from "../../config/axiosInstance";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

const mutex = new Mutex();

let accessToken = "";

export function setAccessToken(token: string) {
  accessToken = token;
  setToken(token); // synchronise avec axios si nécessaire
}

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
  prepareHeaders: (headers) => {
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: typeof baseQuery = async (
  args,
  api,
  extraOptions,
) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { url: "/auth/refresh-token", method: "POST" },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          const newToken = (refreshResult.data as any).accessToken;
          setAccessToken(newToken);

          result = await baseQuery(args, api, extraOptions);
        } else {
          // Redirection ou logout
          if (typeof window !== "undefined") {
            // window.location.href = "/";
            console.log("redirection");
          }
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

const API_URL = {
  //AUTH

  REGISTER: () => `${BASE_URL}/auth/register`,
  LOGIN: () => `${BASE_URL}/auth/login`,
  GOOGLE_LOGIN: () => `${BASE_URL}/auth/google`,
  VERIFY_AUTH: () => `${BASE_URL}/auth/verify-auth`,
  VERIFY_EMAIL: (token: string) => `${BASE_URL}/auth/verify-email/${token}`,
  VERIFY_CODE: () => `${BASE_URL}/auth/verify`,
  FORGOT_PASSWORD: () => `${BASE_URL}/auth/forgot-password`,
  RESET_PASSWORD: () => `${BASE_URL}/auth/reset-password`,
  USER_ME: () => `${BASE_URL}/auth/me`,
  LOGOUT: () => `${BASE_URL}/auth/logout`,
  ACTIVATE_EMAIL: () => `${BASE_URL}/auth/activate-email`,

  //USER

  UPDATE_USER: () => `${BASE_URL}/user/profile`,
  CREATE_USER: () => `${BASE_URL}/user/create`,
  GET_USERS: () => `${BASE_URL}/users`,
  GET_USER: (id: string) => `${BASE_URL}/user/${id}`,
  DELETE_USER: (id: string) => `${BASE_URL}/user/${id}`,

  GET_USERS_NOT_ME: () => `${BASE_URL}/users/all-not-me`,

  // SERVICE

  GET_SERVICES: () => `${BASE_URL}/services`,
  GET_SERVICE: (id: string) => `${BASE_URL}/service/${id}`,
  ADD_SERVICE: () => `${BASE_URL}/service`,

  // PROJECTS

  GET_PROJECTS: () => `${BASE_URL}/projects`,
  GET_PROJECT: (id: string) => `${BASE_URL}/project/${id}`,
  ADD_PROJECT: () => `${BASE_URL}/project`,

  //BLOG POST

  GET_BLOG_POSTS: () => `${BASE_URL}/blogPosts`,
  GET_BLOG_POST: (id: string) => `${BASE_URL}/blogPost/${id}`,
  ADD_BLOG_POST: () => `${BASE_URL}/blogPost`,

  // DEVIS

  ADD_QUOTE_REQUEST: () => `${BASE_URL}/quote-request`,
  GET_ALL_QUOTE_REQUEST: () => `${BASE_URL}/quote-requests`,
  GET_QUOTE_REQUEST: (id: string) => `${BASE_URL}/quote-request/${id}`,

  // CONTACT

  ADD_CONTACT: () => `${BASE_URL}/contact`,
  GET_CONTACTS: () => `${BASE_URL}/contacts`,
  GET_CONTACT: (id: string) => `${BASE_URL}/contact/${id}`,

  //FORMATION

  GET_ALL_FORMATIONS: () => `${BASE_URL}/formations`,

  //MODULE

  GET_MODULES_FORMATION_ID: (formationId: string) =>
    `${BASE_URL}/modules/formation/${formationId}`,
  GET_MODULES: () => `${BASE_URL}/modules`,

  //INSCRIPTION MODULE

  INSCRIPTION_MODULE: () => `${BASE_URL}/inscription-module`,

  //CAREER_INFO (offre emploi ou carrière)
  GET_ALL_CAREER_INFO: () => `${BASE_URL}/careers-info`,
  GET_CAREER_INFO: (id: string) => `${BASE_URL}/career-info/${id}`,

  //CAREER (Postulant ou Candidat)

  ADD_CAREER: () => `${BASE_URL}/career`,
  GET_ALL_CAREER: () => `${BASE_URL}/careers`,
  GET_CARRER: (id: string) => `${BASE_URL}/career/${id}`,

  //EVENEMENT

  ADD_EVENT: () => `${BASE_URL}/event`,
  GET_EVENT: (id: string) => `${BASE_URL}/event/${id}`,
  GET_EVENTS: () => `${BASE_URL}/events`,

  // INSCRIPTION EVENEMENT

  INSCRIPTION_EVENT: () => `${BASE_URL}/event-enrollment`,
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "User",
    "Service",
    "Project",
    "BlogPost",
    "QuoteRequest",
    "Contact",
    "Formation",
    "CareerInfo",
    "Career",
    "Module",
    "Event",
  ],
  endpoints: (builder) => ({
    //auth
    register: builder.mutation<IResponseRegister, IRegister>({
      query: (data) => ({
        url: API_URL.REGISTER(),
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation<
      { success: boolean; data: IUser },
      { email: string; password: string }
    >({
      query: (data) => ({
        url: API_URL.LOGIN(),
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    logoutUser: builder.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: API_URL.LOGOUT(),
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    verifyAuth: builder.query<{ success: boolean; data: IUser }, void>({
      query: () => ({
        url: API_URL.VERIFY_AUTH(),
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    verifyTokenEmail: builder.mutation<
      { success: boolean; message: string },
      { token: string }
    >({
      query: ({ token }) => ({
        url: `${API_URL.VERIFY_EMAIL(token)}`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),
    verifyCode: builder.mutation({
      query: (data) => ({
        url: API_URL.VERIFY_CODE(),
        method: "GET",
        body: data,
      }),
    }),
    resendActivateEmail: builder.mutation<
      { success: boolean; message: string },
      { email: string }
    >({
      query: (data) => ({
        url: API_URL.ACTIVATE_EMAIL(),
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    //USER
    updateUser: builder.mutation({
      query: (data) => ({
        url: API_URL.UPDATE_USER(),
        method: "POST",
        body: data,
      }),
    }),
    userMe: builder.query<{ success: true; data: IUser }, void>({
      query: () => ({
        url: API_URL.USER_ME(),
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUsersNotme: builder.query<{ success: true; data: IUser[] }, void>({
      query: () => ({
        url: API_URL.GET_USERS_NOT_ME(),
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    //SERVICE

    getServices: builder.query<{ success: true; data: IService[] }, void>({
      query: () => ({
        url: API_URL.GET_SERVICES(),
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getServiceById: builder.query<
      { success: boolean; data: IService },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${API_URL.GET_SERVICE(id)}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    addService: builder.mutation<IResponseApi<IService>, FormData>({
      query: (data) => ({
        url: `${API_URL.ADD_SERVICE()}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),

    //PROJECT

    getProjects: builder.query<{ success: true; data: IProject[] }, void>({
      query: () => ({
        url: API_URL.GET_PROJECTS(),
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    getProjectById: builder.query<
      { success: boolean; data: IProject },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${API_URL.GET_PROJECT(id)}`,
        method: "GET",
      }),
      providesTags: ["Project"],
    }),

    addProject: builder.mutation<IResponseApi<IProject>, FormData>({
      query: (data) => ({
        url: `${API_URL.ADD_PROJECT()}`,
        method: "POST",
        body: data,
      }),
    }),

    // Blog Post

    getBlogPosts: builder.query<{ success: true; data: IBlogPost[] }, void>({
      query: () => ({
        url: API_URL.GET_BLOG_POSTS(),
        method: "GET",
      }),
      providesTags: ["BlogPost"],
    }),

    getBlogPostById: builder.query<
      { success: boolean; data: IBlogPost },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${API_URL.GET_BLOG_POST(id)}`,
        method: "GET",
      }),
      providesTags: ["BlogPost"],
    }),

    addBlogPost: builder.mutation<
      { success: true; data: IQuoteRequest[] },
      FormData
    >({
      query: (data) => ({
        url: `${API_URL.ADD_BLOG_POST()}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["BlogPost"],
    }),

    // DEVIS

    getAllQuoteRequest: builder.query<
      { success: true; data: IQuoteRequest[] },
      void
    >({
      query: () => ({
        url: `${API_URL.GET_ALL_QUOTE_REQUEST()}`,
        method: "GET",
      }),
      providesTags: ["QuoteRequest"],
    }),

    addQuoteRequest: builder.mutation<
      IResponseApi<IQuoteRequest>,
      IQuoteRequest
    >({
      query: (data) => ({
        url: `${API_URL.ADD_QUOTE_REQUEST()}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["QuoteRequest"],
    }),
    getByIdQuoteRequest: builder.query<
      IResponseApi<IQuoteRequest>,
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${API_URL.GET_QUOTE_REQUEST(id)}`,
        method: "GET",
      }),
      providesTags: ["QuoteRequest"],
    }),

    // CONTACT

    addContact: builder.mutation<IResponseApi<IContact>, IContact>({
      query: (data) => ({
        url: `${API_URL.ADD_CONTACT()}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contact"],
    }),
    getContacts: builder.query<{ success: true; data: IContact[] }, void>({
      query: () => ({
        url: `${API_URL.GET_CONTACTS()}`,
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),
    getContactById: builder.query<
      { success: true; data: IContact },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${API_URL.GET_CONTACT(id)}`,
        method: "GET",
      }),
      providesTags: ["Contact"],
    }),

    //FORMATIONS

    getAllFormations: builder.query<
      { success: true; data: IFormation[] },
      void
    >({
      query: () => ({
        url: `${API_URL.GET_ALL_FORMATIONS()}`,
        method: "GET",
      }),
      providesTags: ["Formation"],
    }),

    // MODULE

    getModulesByIdFormation: builder.query<
      { success: true; data: IModule[] },
      { formationId: string }
    >({
      query: ({ formationId }) => ({
        url: `${API_URL.GET_MODULES_FORMATION_ID(formationId)}`,
        method: "GET",
      }),
      providesTags: ["Module"],
    }),
    getAllModule: builder.query<{ success: true; data: IModule[] }, void>({
      query: () => ({
        url: `${API_URL.GET_MODULES()}`,
        method: "GET",
      }),
      providesTags: ["Module"],
    }),

    // INSRIPTION MODULE

    inscriptionModule: builder.mutation<
      { success: true; message: string; data: IInsriptionModule },
      IInsriptionModule
    >({
      query: (data) => ({
        url: `${API_URL.INSCRIPTION_MODULE()}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Module"],
    }),

    // CAREER INFO (Offre emploi)
    getAllCareerInfos: builder.query<
      { success: true; data: ICareerInfo[] },
      void
    >({
      query: () => ({
        url: `${API_URL.GET_ALL_CAREER_INFO()}`,
        method: "GET",
      }),
      providesTags: ["CareerInfo"],
    }),
    getCareerInfoById: builder.query<IResponseApi<ICareerInfo>, { id: string }>(
      {
        query: ({ id }) => ({
          url: `${API_URL.GET_CAREER_INFO(id)}`,
          method: "GET",
        }),
        providesTags: ["CareerInfo"],
      },
    ),

    // CAREER

    getAllCareer: builder.query<{ success: true; data: ICareer[] }, void>({
      query: () => ({
        url: `${API_URL.GET_ALL_CAREER()}`,
        method: "GET",
      }),
      providesTags: ["Career"],
    }),

    getCareerById: builder.query<
      { success: true; data: ICareer },
      { id: string }
    >({
      query: ({ id }) => ({
        url: `${API_URL.GET_CARRER(id)}`,
        method: "GET",
      }),
      providesTags: ["Career"],
    }),

    addCareer: builder.mutation<IResponseApi<ICareer>, FormData>({
      query: (data) => ({
        url: `${API_URL.ADD_CAREER()}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Career"],
    }),
    addEvent: builder.mutation<IResponseApi<IEvent>, FormData>({
      query: (data) => ({
        url: `${API_URL.ADD_EVENT()}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Event"],
    }),

    getEventAll: builder.query<{ success: boolean; data: IEvent[] }, void>({
      query: () => ({
        url: `${API_URL.GET_EVENTS()}`,
        method: "GET",
      }),
      providesTags: ["Event"],
    }),
    getByIdEvent: builder.query<IResponseApi<IEvent>, { id: string }>({
      query: ({ id }) => ({
        url: `${API_URL.GET_EVENT(id)}`,
        method: "GET",
      }),
      providesTags: ["Event"],
    }),

    inscriptionEvent: builder.mutation<
      IResponseApi<IEventEnrollment>,
      IEventEnrollment
    >({
      query: (data) => ({
        url: `${API_URL.INSCRIPTION_EVENT()}`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutUserMutation,
  useResendActivateEmailMutation,
  useVerifyTokenEmailMutation,
  useVerifyAuthQuery,
  useUserMeQuery,
  useGetServicesQuery,
  useGetServiceByIdQuery,
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useAddProjectMutation,
  useGetBlogPostsQuery,
  useGetBlogPostByIdQuery,
  useAddBlogPostMutation,
  useAddServiceMutation,
  useAddQuoteRequestMutation,
  useGetAllQuoteRequestQuery,
  useAddContactMutation,
  useGetContactsQuery,
  useGetContactByIdQuery,
  useGetAllFormationsQuery,
  useGetModulesByIdFormationQuery,
  useGetAllModuleQuery,
  useInscriptionModuleMutation,
  useGetAllCareerInfosQuery,
  useGetCareerInfoByIdQuery,
  useGetCareerByIdQuery,
  useGetAllCareerQuery,
  useAddCareerMutation,
  useGetByIdQuoteRequestQuery,
  useGetUsersNotmeQuery,
  useAddEventMutation,
  useGetEventAllQuery,
  useGetByIdEventQuery,
  useInscriptionEventMutation
} = api;
