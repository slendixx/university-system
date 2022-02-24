const APIURL = "http://127.0.0.1:3000/api/v1/";

const fetchFromApi = ({ apiResource, method }) => {
  return new Promise((resolve, reject) => {
    console.log(APIURL + apiResource);
    fetch(APIURL + apiResource, {
      method: method,
    })
      .then((response) => {
        response
          .json()
          .then((resolvedResponse) => {
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
