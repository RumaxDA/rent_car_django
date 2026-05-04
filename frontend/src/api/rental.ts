export async function getRentals() {
  const token = localStorage.getItem("accessToken");
  const url = `${import.meta.env.VITE_API_URL}/api/rentals/`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });
  try {
    if (!response.ok) {
      throw new Error(`Response status : ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Couldn't download rentals data", error);
    return { results: [] };
  }
}
