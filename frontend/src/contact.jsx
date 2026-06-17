import { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", message: "" });
  const [status, setStatus] = useState({ ok: null, msg: "" });

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const validEmail = (v) => /^\S+@\S+\.\S+$/.test(v);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) return setStatus({ ok: false, msg: "Please enter your name." });
    if (!validEmail(form.email)) return setStatus({ ok: false, msg: "Please enter a valid email." });
    // Simulate submit
    setTimeout(() => {
      setStatus({ ok: true, msg: "Thanks — your message was sent!" });
      setForm({ name: "", email: "", phone: "", password: "", message: "" });
    }, 500);
  };

  return (
    <div className="contact-container">
      <h2 style={{ margin: 0, marginBottom: 8 }}>Get in touch</h2>
      <p style={{ marginTop: 0, color: "var(--muted)" }}>Fill the form and I will get back to you shortly.</p>

      <form className="contact-form" onSubmit={onSubmit}>
        <div className="form-row">
          <div className="form-field">
            <label>Name</label>
            <input name="name" value={form.name} onChange={onChange} placeholder="Your full name" />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input name="email" value={form.email} onChange={onChange} placeholder="you@example.com" />
          </div>
        </div>

        <div className="form-row">
          <div className="form-field">
            <label>Phone</label>
            <input name="phone" value={form.phone} onChange={onChange} placeholder="Optional" />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={onChange} placeholder="Optional" />
          </div>
        </div>

        <div className="form-field">
          <label>Message</label>
          <textarea name="message" value={form.message} onChange={onChange} rows={5} placeholder="Tell me more..." />
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button className="btn-primary" type="submit">Send message</button>
          {status.ok === true && <div className="form-success">{status.msg}</div>}
          {status.ok === false && <div className="form-error">{status.msg}</div>}
        </div>
      </form>
    </div>
  );
};

export default Contact;