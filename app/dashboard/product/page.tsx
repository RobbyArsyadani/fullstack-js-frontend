"use client";

import { useEffect, useState } from "react";
import type { Product } from "../../types/type";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Product() {
  const [data, setData] = useState<Product[]>([]);
  const pathname = usePathname();

  const getData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`
      );
      if (!res.ok) {
        throw new Error("Gagal ambil data");
      }
      const product = await res.json();
      setData(product.data);
    } catch (err) {
      if (err instanceof Error) {
        console.error("Error: ", err.message);
      }
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Yakin ingin menghapus produk ini?")) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message);
      }

      alert(result.message);
      getData();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Daftar Produk</h1>
          <Link
            href={`${pathname}/create`}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition duration-200"
          >
            + Tambah Produk
          </Link>
        </div>

        {data.length === 0 ? (
          <p className="text-center text-gray-500 italic">
            Belum ada produk yang tersedia.
          </p>
        ) : (
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-indigo-600 text-white">
                <th className="p-3 border border-gray-200 text-left">
                  Nama Produk
                </th>
                <th className="p-3 border border-gray-200 text-left">
                  Deskripsi
                </th>
                <th className="p-3 border border-gray-200 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {data.map((datas) => (
                <tr
                  key={datas.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="p-3 border border-gray-200">
                    {datas.product_name}
                  </td>
                  <td className="p-3 border border-gray-200">
                    {datas.product_description}
                  </td>
                  <td className="p-3 border border-gray-200 text-center space-x-3">
                    <Link
                      href={`${pathname}/edit/${datas.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(datas.id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

