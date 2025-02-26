// import baseApi from "../api/baseApi";

// interface ProfileData {
//     name: string;
//     email: string;
//     phone: string;
//     role: string;
//     image: string;
//     payment: boolean;
//     subscribtion: boolean;
//     isDeleted: boolean;
//     verified: boolean;
//   }

// export const userApi = baseApi.injectEndpoints({
//   endpoints: (builder) => ({
//     userProfile: builder.query<ProfileData, void>({
//       query: () => ({
//         url: "/user/profile",
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//       }),
//       providesTags: ["User"],
//     }),
//   }),
// });

// export const { useUserProfileQuery } = userApi;


import baseApi from "../api/baseApi";

interface ProfileData {
 data:{
  _id:string;
  name: string;
  email: string;
  phone: string;
  role: string;
  image: string;
  age:number;
  gender:number;
  height:number;
  weight:number;
  payment: boolean;
  subscription: boolean;
  isDeleted: boolean;
  verified: boolean;
 }
}



export const userApi = baseApi.injectEndpoints({
  overrideExisting: true,

  endpoints: (builder) => ({
    // Fetch user profile
    userProfile: builder.query<ProfileData, void>({
      query: () => ({
        url: "/user/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }),
      providesTags: ["User"],
    }),

    // Update user profile
    updateProfile: builder.mutation({
      query: (updateInfo) => ({
        url: "/user/update-profile",
        method: "POST",
        body: updateInfo,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          // "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["User"], // Invalidates 'User' tag after mutation
    }),

    // updateProfile: builder.mutation({
    //   query: (updateInfo) => {
    //     const formData = new FormData();
        
    //     // Append all fields dynamically
    //     Object.keys(updateInfo).forEach((key) => {
    //       if (updateInfo[key] !== undefined && updateInfo[key] !== null) {
    //         formData.append(key, updateInfo[key]);
    //       }
    //     });
    
    //     return {
    //       url: "/user/update-profile",
    //       method: "POST",
    //       body: formData,
    //       headers: {
    //         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //       },
    //     };
    //   },
    //   invalidatesTags: ["User"],
    // }),

    // updateProfile: builder.mutation({
    //   query: (formData) => ({
    //     url: 'user/update-profile',
    //     method: 'POST',
    //     body: formData,
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    //     },
    //   }),
    // }),
    
  }),
});

export const { useUserProfileQuery, useUpdateProfileMutation } = userApi;
