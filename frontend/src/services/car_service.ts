export const get_cars = async () => {
  try {
    const response = await fetch("http://localhost:8000/api/cars/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("Error", error);
    throw error;
  }
};
