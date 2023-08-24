import { useCallback, useState } from 'react';

export function useApi() {
  const [data, setData] = useState([]);
  const [created, setCreated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isDeleted, setIsDeleted] = useState(0);

  const fetchData = useCallback(
    async function (url, method = 'GET', auth, postData) {
      setData([]);
      setCreated(false);
      try {
        setIsLoading(true);
        setIsError(false);
        setErrorMsg('');
        setCreated(false);

        const response = await fetch(url, {
          method: method,
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${auth}`,
          },
          body: JSON.stringify(postData),
        });

        if (response.status === 204) {
          setIsDeleted(isDeleted + 1);
        } else {
          const responseJSON = await response.json();

          if (response.status === 200 || response.status === 201 || response.status === 202) {
            setData(responseJSON);
            setCreated(true);
          } else if (response.status === 400 || response.status === 401) {
            setIsError(true);
            setErrorMsg(responseJSON.errors[0].message);
          } else {
            setIsError(true);
            setErrorMsg('Something went wrong.. please try again later');
          }
        }
      } catch (error) {
        setIsError(true);
        setErrorMsg('Something went wrong.. please try again later');
      } finally {
        setIsLoading(false);
      }
    },
    [isDeleted]
  );

  return { data, created, isDeleted, isLoading, isError, errorMsg, fetchData };
}
