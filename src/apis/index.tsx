import axios from 'axios';

export default axios.create({
  baseURL: 'https://alpha-vantage.p.rapidapi.com',
  headers: {
    'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
    'x-rapidapi-key': '8dd47b5d4cmsh5796ad70ecf176ap1f1a80jsna8911fb77a43',
  },
});
