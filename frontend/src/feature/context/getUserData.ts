import type { UserDetailsType } from "../../types";

export const getUserData = async () => {
  const res = await fetch("http://localhost:5000/api/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const result = await res.json();

  return result.data.user as UserDetailsType;
};
