import React, { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks — this form demonstration does not submit to a server.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <main className="main container">
      <article className="post-card" style={{ marginTop: 18 }}>
        <header className="post-header">
          <h2 className="post-title">Contact</h2>
        </header>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 10 }}>
          <input
            name="name"
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            name="email"
            type="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            name="message"
            placeholder="Your message"
            value={form.message}
            onChange={handleChange}
            style={{ minHeight: 120, padding: 12, borderRadius: 10, border: "1px solid var(--border)", background: "#0b1422", color: "var(--text)" }}
          />
          <button type="submit" style={{ width: 160 }}>Send Message</button>
        </form>
      </article>
    </main>
  );
}