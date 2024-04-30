import {useCallback, useEffect, useState} from 'react';

export function useCustomApi<Api extends (...args: any[]) => Promise<any>>(
  api: Api,
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  type DataType = ReturnType<Api> extends Promise<infer ResponseData>
    ? ResponseData
    : any | undefined;
  const [data, setData] = useState<DataType>();

  const load = useCallback(
    (...args: Parameters<Api>) => {
      if (isLoading || data != undefined || !api || errorMessage != undefined) {
        return;
      }
      setIsLoading(true);
      setErrorMessage(undefined);
      api(...args)
        .then(apiData => {
          setData(apiData);
        })
        .catch((error: any | Error) => {
          console.error(error);
          setErrorMessage('Something went wrong!');
        })
        .finally(() => setIsLoading(false));
    },
    [api, data, isLoading],
  );

  const refresh = useCallback(() => {
    if (isLoading || !api) {
      return;
    }
    setIsLoading(true);
    setErrorMessage(undefined);
    setData(undefined); // Clear data before refresh
    api()
      .then(apiData => {
        setData(apiData);
      })
      .catch((error: any | Error) => {
        console.error(error);
        setErrorMessage('Something went wrong!');
      })
      .finally(() => setIsLoading(false));
  }, [api, isLoading]);

  return {
    isLoading,
    errorMessage,
    data,
    load,
    refresh,
  };
}
