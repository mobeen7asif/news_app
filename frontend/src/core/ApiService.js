import axios from 'axios';
const siteData = {baseURL: 'http://127.0.0.1:8000/', apiBaseURL: 'http://127.0.0.1:8000/api/'};
const sendPostRequest = async (endpoint = '', formData = {}, headers = {}) => {
  const url = siteData.apiBaseURL + endpoint;
  console.log('in get ', url);
  try {
    console.log('in get ');
    const response = await axios.post(url, formData, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        ...headers,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};


const sendGetRequest = async (endpoint = '', headers = {}, init = {}) => {
 
  const url = siteData.apiBaseURL + endpoint;
  console.log('asda', url);
  try {
    const response = await axios.get(url, {
      ...init,
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        ...headers,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

const sendDeleteRequest = async (endpoint = '', headers = {}) => {
  const url = siteData.apiBaseURL + endpoint;
  try {
    const response = await axios.delete(url, {
      method: 'DELETE',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        ...headers,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

export { sendPostRequest, sendGetRequest, sendDeleteRequest };
