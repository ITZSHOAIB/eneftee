const BACKEND_URL = process.env.REACT_APP_BACKEND_URL as string;

export const minifyAddress = (address: string) => {
  const start = address.substring(0, 5);
  const end = address.substring(address.length - 4);
  return `${start}...${end}`;
};

export const fetchAPI = async (
  middlePoint: string,
  mainEndPoint: string,
  reqObj: any
) => {
  const response = await fetch(
    `${BACKEND_URL}/${middlePoint}/${mainEndPoint}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqObj),
    }
  );
  return await response.json();
};
