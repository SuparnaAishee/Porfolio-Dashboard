"use server";

import { AxiosSecure } from "@/src/lib/AxiosSecure";

export const addProject = async (payload: FormData) => {
  try {
    const { data } = await AxiosSecure.post(
      "/projects/create-project",
      payload
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getAllProject = async () => {
  try {
    const { data } = await AxiosSecure.get("/projects");
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const getSingleProject = async (id: string) => {
  try {
    const { data } = await AxiosSecure.get(`/projects/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};

export const updateProject = async (payload: {
  data: FormData;
  id: string;
}) => {
  try {
    const { data } = await AxiosSecure.put(
      `/projects/${payload.id}`,
      payload.data
    );
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
export const deleteProject = async (id: string) => {
  try {
    const { data } = await AxiosSecure.delete(`/projects/${id}`);
    return data;
  } catch (error: any) {
    return error.response.data;
  }
};
