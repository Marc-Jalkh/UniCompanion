export const baseUrl: string = 'http://localhost:3000';

async function useGetFromApi<T>(
  path: String,
  mapper: (jsonData: any) => T,
): Promise<T | null> {
  try {
    const response = await fetch(`${path}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    return mapper(jsonData);
  } catch (error) {
    console.error('Error fetching API data:', error);
    throw new Error('Error fetching API data: ' + error);
  }
}

async function usePostToApi<T>(
  path: String,
  data: any,
  mapper: (jsonData: any) => T,
): Promise<T | null> {
  try {
    const response = await fetch(`${baseUrl}/${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const jsonData = await response.json();
    return mapper(jsonData);
  } catch (error) {
    console.error('Error fetching API data:', error);
    throw new Error('Error fetching API data: ' + error);
  }
}

export {useGetFromApi, usePostToApi};
