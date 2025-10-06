"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export interface User {
  id: number;
  name: string;
  email?: string | null;
}

interface PaginationResponse {
  users: User[];
  total: number;
}

export const usePaginationHelper = (apiUrl: string, usersPerPage = 5) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [refreshFlag, setRefreshFlag] = useState(false);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch users with pagination and search
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(apiUrl, {
        params: {
          page: currentPage,
          limit: usersPerPage,
          searchName: debouncedSearch || undefined,
        },
      });
      const { data }: { data: PaginationResponse } = response.data;
      setUsers(data.users);
      setTotalPages(Math.ceil(data.total / usersPerPage));
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Fetch on mount and on updates
  useEffect(() => {
    fetchUsers();
  }, [currentPage, debouncedSearch, refreshFlag]);

  // Add user
  const addUser = async (name: string) => {
    if (!name.trim()) throw new Error("Name cannot be empty");
    const response = await axios.post(apiUrl, { name });
    const createdUser = response.data.data;
    setUsers((prev) => [createdUser, ...prev]);
    setRefreshFlag((prev) => !prev);
    return createdUser;
  };

  // Delete user
  const deleteUser = async (id: number) => {
    await axios.delete(`${apiUrl}/${id}`);
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  // Pagination controls
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  return {
    users,
    currentPage,
    totalPages,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    addUser,
    deleteUser,
    handlePrevPage,
    handleNextPage,
    fetchUsers,
    goToPage,
  };
};
