const baseUrl = import.meta.env.VITE_BASE_URL as string;

type methods = "POST" | "GET" | "PUT" | "DELETE";
type authType = "noauth" | "protected";

export type apiResponse<t> = {
  success: boolean;
  message: string;
  data: t;
};

export const apiCall = async <tresponse = null, trequest = null>(
  route: string,
  method: methods,
  auth: authType,
  data?: trequest
): Promise<apiResponse<tresponse>> => {
  let headers: HeadersInit = {};

  if (!(data instanceof FormData)) {
    headers = {
      "Content-Type": "application/json",
    };
  }

  if (auth == "protected") {
    const token = localStorage.getItem("token");
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config: RequestInit = {
    method,
    headers,
  };

  if (data instanceof FormData) {
    config.body = data;
  } else if (data) {
    config.body = JSON.stringify(data);
  }

  let response;
  let result;
  try {
    response = await fetch(`${baseUrl}${route}`, config);

    result = await response.json();
  } catch (error) {
    console.log("Error Calling API's", error);
    throw error;
  }

  return result;
};
