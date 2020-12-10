export const Post = async (url: string, payload: any): Promise<Response> => {
  console.log(`calling api @ ${url}`)
  const token: string = localStorage.getItem("token") ?? "";
  console.log("token", token);
  const response = await fetch(url, {
    method: "Post",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
  console.log(`api @ ${url} responded with status ${response.status}`)
  return response;
}

export const Get = async (url: string): Promise<Response> => {
  const response = await fetch(url, {
    method: "Get",
    headers: {
      'Content-Type': 'application/json'
    }
  });

  return response;
}