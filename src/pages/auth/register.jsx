import { useState } from "react";
import { supabase } from "../../../lib/supabaseClient"; // pastikan sudah setup

export default function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          fullname,   // ini akan masuk ke raw_user_meta_data
          avatar_url: null,
          role: "member", // default, bisa diubah nanti
        },
      },
    });

    if (error) {
      setMessage("Error: " + error.message);
    } else {
      setMessage("Registrasi berhasil! Cek email untuk konfirmasi.");
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <input
        type="text"
        placeholder="Nama Lengkap"
        value={fullname}
        onChange={(e) => setFullname(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 w-full"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {loading ? "Mendaftar..." : "Daftar"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}
