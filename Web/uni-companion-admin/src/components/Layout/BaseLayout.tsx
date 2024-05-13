import * as React from "react";
import Button from "@mui/material/Button";
import { useCallback, useRef, useState } from "react";
import styles from "../../styles/Css/BaseLayout.module.css";
import cookies from "js-cookie";

class BaseLayoutProps<model> {
  title: string;
  actionButtons: React.JSX.Element;
  api: string;
  mapper!: (jsonData: any) => model;
  body!: (props: model) => React.JSX.Element;
  data: any;

  constructor(
    title: string,
    actionButtons: React.JSX.Element,
    api: string,
    mapper: (jsonData: any) => model,
    data: any = null,
    //react elkement that takes props: type model
    body: (props: model) => React.JSX.Element
  ) {
    this.title = title;
    this.actionButtons = actionButtons;
    this.api = api;
    mapper = mapper;
    body = body;
    data = data;
  }
}

export default function BaseLayout(props: BaseLayoutProps<any>) {
  var api = useRef(useGetFromApi(props.api, props.mapper));

  const [count, setCount] = useState(0);
  const { isLoading, errorMessage, data, load } = useCustomApi(
    () => api.current
  );


  if (isLoading) {
    return (
      <>
        <h1
          style={{
            position: "absolute",
            top: "45%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            fontSize: "2rem",
          }}
        >
          Loading...
        </h1>
      </>
    );
  }
  return (
    <div>
      <section className={styles.BaseProp}>
        <div className={styles.baseHeading}>
          <h1>{props.title}</h1>
          <section>{props.actionButtons}</section>
        </div>
        {props.body(data)}
      </section>
    </div>
  );
}

export function useCustomApi<Api extends (...args: any[]) => Promise<any>>(
  api: Api
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  type DataType = ReturnType<Api> extends Promise<infer ResponseData>
    ? ResponseData
    : any | undefined;
  const [data, setData] = React.useState<DataType>();

  const load = useCallback(
    (...args: Parameters<Api>) => {
      if (
        isLoading ||
        !api ||
        errorMessage !== undefined ||
        data !== undefined
      ) {
        console.log("returning");
        return;
      }
      setErrorMessage(undefined);
      setData(undefined);
      setIsLoading(true);
      api(...args)
        .then((apiData) => {
          setData(apiData);
          setIsLoading(false)
        })
        .catch((error: any | Error) => {
          console.log(error);
          setErrorMessage("Something went wrong!");
          setIsLoading(false)
        })
    },
    [api, data, errorMessage, isLoading]
  );

  return {
    isLoading,
    errorMessage,
    data,
    load,
  };
}

export const baseUrl: string = "http://localhost:3000";

async function useGetFromApi<T>(
  path: String,
  mapper: (jsonData: any) => T
): Promise<T | null> {
  try {
    const sessionToken = cookies.get("sessionToken"); // Get sessionToken from cookie
    const response = await fetch(`${path}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "token": `${sessionToken}`
      }    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();
    return mapper(jsonData);
  } catch (error) {
    console.error("Error fetching API data:", error);
    throw new Error("Error fetching API data: " + error);
  }
}

async function usePostToApi<T>(
  path: String,
  data: any,
  mapper: (jsonData: any) => T
): Promise<T | null> {
  try {
    const response = await fetch(`${baseUrl}/${path}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "token": "fdfasfds"
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.log(response);
      throw new Error("Network response was not ok");
    }
    const jsonData = await response.json();
    return mapper(jsonData);
  } catch (error) {
    console.error("Error fetching API data:", error);
    throw new Error("Error fetching API data: " + error);
  }
}

export { useGetFromApi, usePostToApi };
