import { useMemo, useState } from "react";
import useSWR, { mutate } from "swr";

const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export function usePaginationHelperSWR(apiUrl: string, pageSize = 5) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const query = useMemo(() => {
    const params = new URLSearchParams({
      _page: currentPage.toString(),
      _limit: pageSize.toString(),
      ...(searchTerm && { q: searchTerm }),
    });
    return `${apiUrl}?${params}`;
  }, [apiUrl, currentPage, pageSize, searchTerm]);

  const { data, error, isValidating } = useSWR(query, fetcher, {
    keepPreviousData: true,
  });

  const users = data?.data || data || [];
  const totalPages = data?.totalPages || 1;

  const addUser = async (name: string) => {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    if (!res.ok) throw new Error("Failed to create user");
    const newUser = await res.json();

    // Optimistic update
    mutate(query, (old: any) => {
      return { ...old, data: [newUser, ...(old?.data || [])] };
    }, false);

    mutate(query); // Revalidate after
    return newUser;
  };

  const deleteUser = async (id: number) => {
    const res = await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete user");

    // Optimistic UI update
    mutate(query, (old: any) => {
      return { ...old, data: old?.data?.filter((u: any) => u.id !== id) };
    }, false);

    mutate(query); // revalidate
  };

  return {
    users,
    loading: !data && !error,
    error,
    currentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    addUser,
    deleteUser,
    handlePrevPage: () =>
      setCurrentPage((p) => (p > 1 ? p - 1 : p)),
    handleNextPage: () =>
      setCurrentPage((p) => p + 1),
    goToPage: (page: number) => setCurrentPage(page),
    isValidating,
  };
}
