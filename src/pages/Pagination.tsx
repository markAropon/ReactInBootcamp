"use client";
import { usePaginationHelper } from "@/helpers/PaginationHelper";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import PageAnimation from "../common/PageAnimation";
// SWR version
// import { usePaginationHelperSWR } from "@/helpers/usePaginationHelperSWR";

const PaginationPage: React.FC = () => {
  const apiUrl = "http://localhost:3000/api/users";
  const {
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
    goToPage,
  } = usePaginationHelper(apiUrl, 5);
  // SWR version
  // const {
  //   users,
  //   currentPage,
  //   totalPages,
  //   loading,
  //   error,
  //   searchTerm,
  //   setSearchTerm,
  //   addUser,
  //   deleteUser,
  //   handlePrevPage,
  //   handleNextPage,
  //   goToPage,
  // } = usePaginationHelperSWR(apiUrl, 5);

  const [newUserName, setNewUserName] = useState("");
  const [showModal, setShowModal] = useState(false);

  // --- Sweet Alert Helpers ---
  const successAlert = (title: string, text?: string) =>
    Swal.fire({
      title,
      text,
      icon: "success",
      confirmButtonColor: "#000",
    });

  const errorAlert = (title: string, text?: string) =>
    Swal.fire({
      title,
      text,
      icon: "error",
      confirmButtonColor: "#000",
    });

  const confirmAlert = async (title: string, text?: string) => {
    const result = await Swal.fire({
      title,
      text,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, confirm",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#000",
      cancelButtonColor: "#888",
    });
    return result.isConfirmed;
  };

  // --- Add User ---
  const handleAddUser = async () => {
    if (!newUserName.trim()) {
      errorAlert("Invalid Input", "Please enter a valid name");
      return;
    }

    try {
      const created = await addUser(newUserName);
      await successAlert("User Created!", `ID: ${created.id}`);
      setNewUserName("");
      setShowModal(false);
    } catch (err: any) {
      errorAlert("Failed to Add User", err.message);
    }
  };

  // --- Delete User ---
  const handleDeleteUser = async (id: number) => {
    const confirmed = await confirmAlert(
      "Are you sure?",
      "This action cannot be undone!"
    );
    if (!confirmed) return;

    try {
      await deleteUser(id);
      await successAlert("Deleted!", "User has been removed.");
    } catch {
      errorAlert("Failed", "Could not delete user.");
    }
  };

  return (
    <PageAnimation keyValue="pagination-page">
      <div className="min-h-screen w-full bg-gradient-to-br from-neutral-50 to-neutral-200 overflow-y-auto text-black relative">
        <Link
          to="/"
          className="fixed top-6 left-6 bg-white border border-neutral-300 rounded-full shadow-md hover:bg-neutral-100 transition-colors p-3 z-50"
        >
          <FaHome className="text-black text-2xl" />
        </Link>

        <div className="container mx-auto px-6 py-12">
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-extrabold text-black">
              User Management
            </h1>
            <p className="text-neutral-600 mt-2">
              Browse, search, add, and delete users
            </p>
          </header>

          {/* 🔍 Search Bar */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="relative">
              <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500 text-2xl pointer-events-none" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name..."
                className="border border-neutral-400 rounded-full px-10 py-2 w-72 bg-white text-black focus:ring-2 focus:ring-neutral-400 transition"
              />
            </div>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="text-sm text-neutral-600 hover:text-black transition"
              >
                ✖ Clear
              </button>
            )}
          </div>

          {/* Loading & Errors */}
          {loading && (
            <p className="text-center text-neutral-500">Loading...</p>
          )}
          {error && <p className="text-center text-red-500">{error}</p>}

          {/* Table */}
          {!loading && !error && (
            <>
              <table className="min-w-full bg-white border border-neutral-300 rounded-lg shadow-md">
                <thead className="bg-neutral-100 text-neutral-800 uppercase text-sm">
                  <tr>
                    <th className="py-3 px-4 border-b text-center font-semibold">
                      ID
                    </th>
                    <th className="py-3 px-4 border-b text-center font-semibold">
                      Name
                    </th>
                    <th className="py-3 px-4 border-b text-center font-semibold">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-neutral-50 transition-colors"
                      >
                        <td className="py-2 px-4 border-b text-center">
                          {user.id}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          {user.name}
                        </td>
                        <td className="py-2 px-4 border-b text-center">
                          <button
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-800 font-medium transition"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={3}
                        className="text-center py-4 text-neutral-500 italic"
                      >
                        No users found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* 🟡 Compact Pagination */}
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="px-3 py-1 border border-neutral-300 rounded-full text-sm text-neutral-700 bg-white hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  « Prev
                </button>

                <div className="flex gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                          currentPage === page
                            ? "bg-black text-white"
                            : "bg-white border border-neutral-300 text-neutral-700 hover:bg-neutral-100"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 border border-neutral-300 rounded-full text-sm text-neutral-700 bg-white hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  Next »
                </button>
              </div>
            </>
          )}
        </div>

        {/* 🟢 Floating Action Button */}
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-8 right-8 w-14 h-14 bg-black text-white rounded-full shadow-lg hover:bg-neutral-800 flex items-center justify-center text-3xl transition z-50"
          aria-label="Add User"
        >
          +
        </button>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-80">
              <h2 className="text-lg font-bold mb-4">Add New User</h2>
              <input
                type="text"
                value={newUserName}
                onChange={(e) => setNewUserName(e.target.value)}
                placeholder="Enter name"
                className="border border-neutral-400 rounded px-3 py-2 w-full mb-4 bg-white text-black"
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-neutral-300 rounded hover:bg-neutral-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddUser}
                  className="px-4 py-2 bg-black text-white rounded hover:bg-neutral-800 transition"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageAnimation>
  );
};

export default PaginationPage;
