import axios from "axios";
import Cookies from "js-cookie";

// Axios 인스턴스 생성
const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// 요청 인터셉터 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("authToken");
    if (token) {
      const parsedToken = JSON.parse(token);
      config.headers["Authorization"] = `Bearer ${parsedToken.accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
