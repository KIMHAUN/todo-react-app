import {API_BASE_URL} from "../app-config";
const ACCESS_TOKEN = "ACCESS_TOKEN";

export function call(api, method, request) {

  let headers = new Headers({
    "Content-Type": "application/json",
  });

  //로컬 스토리지에서 ACCESS_TOKEN가져오기
  const accessToken = localStorage.getItem("ACCESS_TOKEN");
  if (accessToken && accessToken !== null) {
    headers.append("Authorization", "Bearer " + accessToken);
  }

  let options = {
    headers: headers,
    url: API_BASE_URL + api,
    method: method,
  };
  if (request) {
    //GET
    options.body = JSON.stringify(request);
  }

//console.log(options.url);
  return fetch(options.url, options).then((response) =>
    response.json().then((json) => {
      if (!response.ok) {
        return Promise.reject(json);
      }
      return json;
    })
  )
  .catch((error) => {
    //상태 분석해 login페이지로 리디렉트
    console.log(error.status);
    if (error.status === 403) {
      window.location.href = "/login"; //redirect
    }
    return Promise.reject(error);
  });
}

//login
export function signin(userDTO) {
  return call("/auth/signin", "POST", userDTO)
    .then((response) => {
      console.log("response: " + response);
      if (response.token) {
        //로컬 스토리지에 토큰 저장
        localStorage.setItem("ACCESS_TOKEN", response.token);
        // token이 존재하면 Todo화면으로 리디렉트
        window.location.href = "/";
      }
      //alert("로그인 토큰: " + response.token);
    });
}

//logout(백엔드 관련은 아니지만 로컬 스토리지 관련을 ApiService에 작성.)
export function signout() {
  localStorage.setItem("ACCESS_TOKEN", null);
  window.location.href = "/login";
}
