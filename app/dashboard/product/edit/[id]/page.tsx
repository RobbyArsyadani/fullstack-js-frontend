"use client";

import { ChangeEvent, use, useEffect, useState } from "react";
import Image from "next/image";

export default function ProductEdit({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [oldImage, setOldImage] = useState("");
  const [image, setImage] = useState<File | null>(null);
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
        setOldImage(data.image_path);
      } catch (err) {
        if (err instanceof Error) console.error(err.message);
      }
    };

    fetchData();
  }, [id]);

  const handleImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0] && e.target.files?.[0].size > 2 * 1024 * 1024) {
      alert("Ukuran file maksimal 2MB");
      return;
    }
    setImage(e.target.files?.[0] || null);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/edit/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      setMessage("Berhasil memperbarui data");
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
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Image (kosongkan jika tidak ingin mengubah)
            </label>

            {oldImage && (
              <div>
                <p className="text-sm text-gray-500 mb-1">
                  Gambar saat ini:{" "}
                  <span className="font-medium">{oldImage}</span>
                </p>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${oldImage}`}
                  alt="preview"
                  width={10}
                  height={10}
                  className="w-32 h-32 object-cover rounded mb-2"
                  unoptimized
                />
              </div>
            )}

            <input
              type="file"
              onChange={handleImage}
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

