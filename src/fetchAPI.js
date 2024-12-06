export const fetchAPI = async (uri, options) => {
  try {

    const res = await fetch(uri, options);
    if (!res.ok)
      throw new Error(`HTTP response is: ${res.ok}`);

    return res.json();

  } catch (err) {
    console.log(err);
    throw err;
  }
}