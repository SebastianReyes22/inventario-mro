const API = import.meta.env.VITE_APP_API_MOBILE;

export const getItem = async data => {
  const res = await fetch(`${API}/${data}`);
  return await res.json();
};
