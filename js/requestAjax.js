function $ajax({
  url,
  method = 'post',
  headers = {},
  data,
}) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.keys(headers).forEach((item) => {
      xhr.setRequestHeader(item, headers[item]);
    });
    xhr.send(data);
    xhr.onload = e => {
      resolve({
        data: e.target.response,
      });
    }
  });
};
