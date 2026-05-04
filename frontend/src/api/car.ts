export async function getCars() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/cars/`);
  try {
    if (!response.ok) {
      throw new Error(`response status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Failed to download data", error);
    return { results: [] };
  }
}
