import type { UserDetailsType } from "../../types";
import { apiCall } from "../../utils/api";

export const getUserData = async () => {
  const res = await apiCall("/user", "GET", "protected");
  


 return res.data;


};
