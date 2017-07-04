import {getFinancialData} from './helpers';
import axios from 'axios';

const QUANDL_API_KEY = process.env.QUANDL_API_KEY;

module.exports = io => {
  io.on('connection', socket => {
    socket.on('send stock code', code => {
      axios.get(`https://www.quandl.com/api/v3/datasets/WIKI/${code}/data.json?api_key=${QUANDL_API_KEY}`).then(data => {
        return io.emit('receive stock code', code);
      }).catch(error => console.log(error));
    });
    socket.on('send delete stock code', id => {
      return io.emit('delete stock code', id);
    });
  });
}
