import { useState } from 'react';

export function useApi() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  async function fetchData(url, method = 'GET', auth, postData) {
    try {
      setIsLoading(true);
      setIsError(false);
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${auth}`,
        },
        body: JSON.stringify(postData),
      });
      const responseJSON = await response.json();

      if (response.status === 200 || response.status === 201 || response.status === 202) {
        setData(responseJSON);
      } else if (response.status === 400) {
        setIsError(true);
        setErrorMsg(responseJSON.errors[0].message);
      } else {
        setIsError(true);
        setErrorMsg('Something went wrong.. please try again later');
      }
    } catch (error) {
      setIsError(true);
      setErrorMsg('Something went wrong.. please try again later');
    } finally {
      setIsLoading(false);
    }
  }

  return { data, isLoading, isError, errorMsg, fetchData };
}
