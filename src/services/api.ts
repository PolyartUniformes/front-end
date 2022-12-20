const apiUrl = import.meta.env.VITE_API_URL;

function getToken() {
  const saved = localStorage.getItem("token");

  if (!saved) return;

  const initial = JSON.parse(saved);
  return initial;
}

function headers() {
  let headers: any = {
    "Content-Type": "application/json",
  };
  const token = getToken();
  if (token) {
    headers["authorization"] = token;
  }
  return headers;
}

const post = (url: string, data: any) => {
  return fetch(apiUrl + url, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });
};

const get = (url: string) => {
  return fetch(apiUrl + url, {
    method: "GET",
    headers: headers(),
  });
};

export { post, get };
