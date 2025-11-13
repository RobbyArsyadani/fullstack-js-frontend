"use client";
import { useState, useEffect } from "react";
import type { User } from "@/app/types/type";

export default function UserPage() {
  const [data, setData] = useState<User[]>([]);

  const fetchData = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users`);
      if (!res.ok) {
        throw new Error("Gagal ambil data");
      }
      const getData = await res.json();
      setData(getData.data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error: " + err.message);
      } else {
        console.error("Error tidak dikenal: ", err);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin mau hapus data ini?")) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Gagal menghapus data");
    }

    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Data Pengguna
        </h1>

        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-indigo-600 text-white text-left">
              <th className="p-3 border border-gray-200">Nama</th>
              <th className="p-3 border border-gray-200">Email</th>
              <th className="p-3 border border-gray-200">Edit</th>
              <th className="p-3 border border-gray-200">Delete</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-3 border border-gray-200">
                    {user.username}
                  </td>
                  <td className="p-3 border border-gray-200">{user.email}</td>
                  <td className="p-3 border border-gray-200 text-center">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </td>
                  <td className="p-3 border border-gray-200 text-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-6 text-gray-500 italic"
                >
                  Tidak ada data pengguna
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

