import { get } from "./base";

export const Items = {
  index: (params) => get(`sites/MLA/search?q=${params}`),
  single: (id) => get(`items/${id}`),
  singleDescription: (id) => get(`items/${id}/description`),
};
