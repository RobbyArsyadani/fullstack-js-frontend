"use client";

import { useState, use, useEffect } from "react";
import type { Product } from "@/app/types/type";
import Link from "next/link";

export default function ProductDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  useEffect(() => {

    
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
        );
        if (!res.ok) {
          throw new Error("Data tidak ditemukan");
        }
        const getData = await res.json();
        setData(getData.data);
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error: " + err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-red-500 text-lg font-medium">
          Produk tidak ditemukan
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-xl p-8">
        {data.map((datas) => (
          <div key={datas.id} className="space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">
              {datas.product_name}
            </h1>
            <p className="text-gray-600 leading-relaxed">
              {datas.product_description}
            </p>
          </div>
        ))}

        <div className="mt-8 flex justify-between items-center">
          <Link
            href="/products"
            className="text-indigo-600 hover:text-indigo-800 font-medium transition"
          >
            ← Kembali ke daftar
          </Link>
          <p className="text-sm text-gray-500 italic">halo</p>
        </div>
      </div>
    </div>
  );
}

