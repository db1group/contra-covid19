import axios from 'axios';
import Configuration from '@/configuration';

export default axios.create({
  baseURL: Configuration.value('VUE_APP_BACKEND_URL'),
});
