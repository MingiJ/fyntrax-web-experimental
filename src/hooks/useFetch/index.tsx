"use client";

import { useState, useEffect } from "react";

const useFetch = (service: Function, options: any) => {
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const makeRequest = async () => {
      setLoading(true);
      const res = await service();

      if (!res.ok) {
        setLoading(false);
        throw new Error("Failed to make request at useFetch.");
      }

      setData(res);
      setLoading(false);
    };

    if (options.accessToken) {
      makeRequest();
    }
  }, [options.accessToken]);

  return {
    data,
    errors,
    loading,
  };
};

export default useFetch;
