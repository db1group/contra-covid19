import http from './Http';

export default {
  downloadFile(url = '', filename = 'file.xlsx') {
    return http
      .get(url, { responseType: 'blob' })
      .then(({ data }) => {
        const fileURL = window.URL.createObjectURL(new Blob([data]));
        const fileLink = document.createElement('a');
        fileLink.href = fileURL;
        fileLink.setAttribute('download', filename);
        document.body.appendChild(fileLink);
        fileLink.click();
      });
  },
};
