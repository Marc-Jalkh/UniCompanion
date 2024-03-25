import {useCallback, useState} from 'react';

export function useCustomApi<Api extends (...args: any[]) => Promise<any>>(
  api: Api,
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  type DataType = ReturnType<Api> extends Promise<infer ResponseData>
    ? ResponseData
    : any | undefined;
  const [data, setData] = useState<DataType>();

  const load = useCallback(
    (...args: Parameters<Api>) => {
      if (
        isLoading ||
        !api ||
        errorMessage !== undefined ||
        data !== undefined
      ) {
        return;
      }
      setErrorMessage(undefined);
      setData(undefined);
      setIsLoading(true);
      api(...args)
        .then(apiData => {
          setData(apiData);
        })
        .catch((error: any | Error) => {
          console.log(error);
          setErrorMessage('Something went wrong!');
        })
        .finally(() => setIsLoading(false));
    },
    [api, data, errorMessage, isLoading],
  );

  const refresh = useCallback(() => {
    if (isLoading || !api) {
      return;
    }
    api()
      .then(apiData => {
        setErrorMessage(undefined);
        setData(apiData);
      })
      .catch((error: any | Error) => {
        console.log(error);
        setErrorMessage('Something went wrong!');
      });
  }, [api, isLoading]);

  return {
    isLoading,
    errorMessage,
    data,
    load,
    refresh,
  };
}
