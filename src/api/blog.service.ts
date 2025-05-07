import axiosClient from ".";

export function getBlogList(params: {
  page: number;
  itemsPerPage: number;
  search?: string;
  status?: number;
  sortBy?: string;
  sortDesc?: boolean;
  contentLength?: number;
}) {
  return axiosClient.get("posts", {
    params,
  });
}

export function getBlogBySlug(slug: any) {
  return axiosClient.get(`posts/slug/${slug}`);
}
