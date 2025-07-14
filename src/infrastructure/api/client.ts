export const request = async <T>(
  method: string,
  url: string,
  body?: unknown
): Promise<T> => {
  const res = await fetch(`${import.meta.env.VITE_BASE_API_URL}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) throw new Error("API Error");
  return res.json();
};
