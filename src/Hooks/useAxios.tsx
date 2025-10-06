import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";
import { useCallback, useEffect, useState } from "react";

interface UseAxiosResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useAxios<T = any>(
  config: AxiosRequestConfig,
  dependencies: any[] = []
): UseAxiosResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response: AxiosResponse<T> = await axios(config);
      setData(response.data);
    } catch (err) {
      const axiosErr = err as AxiosError;
      setError(axiosErr.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, [JSON.stringify(config)]);

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}
