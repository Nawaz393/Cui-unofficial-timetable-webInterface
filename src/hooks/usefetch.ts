import axios from 'axios';
import { Rusefetch } from './fetchType';


export const usefetch = async (url: string): Promise<Rusefetch> => {
  try {
    const response = await axios.get(url);

    if (response.status >= 200 && response.status < 300) {
      return {
        error: false,
        data: response.data,
        message: 'Request successful',
        loading: false,
      };
    } else {
      return {
        error: true,
        data: null,
        message: response.data.message || 'Request failed',
        loading: false,
      };
    }
  } catch (err) {
    console.log(err);
    return {
      error: true,
      data: null,

      message:
        (err as unknown as { response: { data: { message: string } } }).response
          ?.data?.message || 'An error occurred',
      loading: false,
    };
  }
};
