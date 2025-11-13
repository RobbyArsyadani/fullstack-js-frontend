"use client";

import { use, useEffect, useState } from "react";

export default function ProductEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const { id } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`
        );
        const result = await res.json();
        if (!res.ok) throw new Error(result.message);

        const data = result.data[0];
        setName(data.product_name);
        setDescription(data.product_description);
      } catch (err) {
        if (err instanceof Error) console.error(err.message);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/edit/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, description }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage(data.message);
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
        setMessage("Gagal update produk");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Edit Produk
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Nama Produk
            </label>
            <input
              type="text"
              placeholder="Masukkan nama produk"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Deskripsi
            </label>
            <input
              type="text"
              placeholder="Masukkan deskripsi produk"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg transition duration-200"
          >
            Update
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.toLowerCase().includes("gagal")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

