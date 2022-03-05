const APIURL = "http://127.0.0.1:3000/api/v1/";

//TODO reimplement this with axios
const fetchFromApi = ({ apiResource, method, body }) => {
  const options = {};
  options.method = method;
  if (body) {
    options.headers = { "Content-Type": "application/json" };
    options.body = JSON.stringify(body);
  }

  return new Promise((resolve, reject) => {
    fetch(APIURL + apiResource, options)
      .then((response) => {
        if (!response.ok) {
          throw Error(response);
        }

        response
          .json()
          .then((resolvedResponse) => {
            if (!resolvedResponse.ok) {
              throw Error(resolvedResponse);
            }
            resolve(resolvedResponse.data);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default fetchFromApi;
