import axios from 'axios'

const postUrl = "http://localhost:42069/api/requestLogger/getByPageWithFilter";
const body = {
    pageNum: 1,
    pageSize: 10
};

export function getRequestLogs(body) {
    axios.post("http://localhost:42069/api/requestLogger/getByPageWithFilter", body).then(
        (res) => {
            console.log('Axios:',res);
            console.log('Axios data:',res.data);
        }).catch((err) => { console.log('Axios Error:', err); });
}