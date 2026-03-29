"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MdUpload } from "react-icons/md";

export default function AddMentor({
  initialData,
  isEditMode,
}: {
  initialData?: any;
  isEditMode?: boolean;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    bio: "",
    experience: "",
    rating: 0,
    totalStudents: 0,
    status: "Active",
  });

  // ✅ PREFILL (EDIT MODE)
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        expertise: initialData.expertise || "",
        bio: initialData.bio || "",
        experience: initialData.experience || "",
        rating: initialData.rating || 0,
        totalStudents: initialData.totalStudents || 0,
        status: initialData.status || "Active",
      });

      if (initialData.imageUrl) {
        setPreview(initialData.imageUrl);
      }
    }
  }, [initialData]);

  // 📸 IMAGE VALIDATION
  const handleImageChange = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be under 5MB");
      return;
    }

    setError("");
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  // 📝 INPUT CHANGE
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "rating" || name === "totalStudents"
          ? Number(value)
          : value,
    }));
  };

  // 🚀 SUBMIT (CREATE + UPDATE)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setError("Name and Email are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formDataToSend = new FormData();

      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("expertise", formData.expertise);
      formDataToSend.append("bio", formData.bio);
      formDataToSend.append("experience", formData.experience);
      formDataToSend.append("rating", String(formData.rating));
      formDataToSend.append(
        "totalStudents",
        String(formData.totalStudents)
      );
      formDataToSend.append("status", formData.status);

      // 📸 Image
      if (image) {
        formDataToSend.append("image", image);
      }

      let res;

      // ✅ EDIT
      if (isEditMode && initialData?._id) {
        res = await fetch(
          `https://skillhat-backend.onrender.com/api/update_mentor/${initialData._id}/`,
          {
            method: "PUT",
            body: formDataToSend,
          }
        );
      }

      // ✅ CREATE
      else {
        res = await fetch("https://skillhat-backend.onrender.com/api/mentor/", {
          method: "POST",
          body: formDataToSend,
        });
      }

      if (!res.ok) throw new Error("Operation failed");

      router.push("/admin/mentors");

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">

        {/* TITLE */}
        <h1 className="text-2xl font-bold mb-6">
          {isEditMode ? "Edit Mentor" : "Add Mentor"}
        </h1>

        {/* ERROR */}
        {error && (
          <div className="mb-4 text-red-600 text-sm bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* IMAGE */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Profile Image
            </label>

            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-500 transition cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="imageUpload"
                onChange={(e) =>
                  e.target.files?.[0] &&
                  handleImageChange(e.target.files[0])
                }
              />

              <label htmlFor="imageUpload" className="cursor-pointer">
                {preview ? (
                  <img
                    src={preview}
                    className="mx-auto h-40 rounded-lg object-cover"
                  />
                ) : (
                  <div className="text-gray-500 flex flex-col items-center gap-2">
                    <MdUpload className="text-3xl" />
                    <p>Click to upload image</p>
                    <p className="text-xs">PNG, JPG up to 5MB</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* NAME */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              name="name"
              value={formData.name}
              className="w-full border p-3 rounded-lg mt-1"
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              className="w-full border p-3 rounded-lg mt-1"
              onChange={handleChange}
              required
            />
          </div>

          {/* EXPERTISE */}
          <div>
            <label className="text-sm font-medium">Expertise</label>
            <input
              name="expertise"
              value={formData.expertise}
              className="w-full border p-3 rounded-lg mt-1"
              onChange={handleChange}
            />
          </div>

          {/* EXPERIENCE */}
          <div>
            <label className="text-sm font-medium">Experience</label>
            <input
              name="experience"
              value={formData.experience}
              className="w-full border p-3 rounded-lg mt-1"
              onChange={handleChange}
            />
          </div>

          {/* BIO */}
          <div>
            <label className="text-sm font-medium">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              className="w-full border p-3 rounded-lg mt-1"
              onChange={handleChange}
            />
          </div>

          {/* GRID */}
          <div className="grid grid-cols-2 gap-4">

            <div>
              <label className="text-sm font-medium">Rating</label>
              <input
                name="rating"
                type="number"
                min="0"
                max="5"
                value={formData.rating}
                className="w-full border p-3 rounded-lg mt-1"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="text-sm font-medium">Students</label>
              <input
                name="totalStudents"
                type="number"
                value={formData.totalStudents}
                className="w-full border p-3 rounded-lg mt-1"
                onChange={handleChange}
              />
            </div>

          </div>

          {/* STATUS */}
          <div>
            <label className="text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              className="w-full border p-3 rounded-lg mt-1"
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update Mentor"
                : "Create Mentor"}
          </button>

        </form>
      </div>
    </div>
  );
}