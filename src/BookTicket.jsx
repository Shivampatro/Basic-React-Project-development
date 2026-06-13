import { useState } from "react";
import "./BookTicket.css";

const BookTicket = () => {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    travelClass: "All Classes",
    quota: "General",
    tatkal: "",
    pwd: false,
    flexible: false,
    passConcession: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search with", formData);
  };

  const swapFromTo = () => {
    setFormData((p) => ({ ...p, from: p.to || "", to: p.from || "" }));
  };

  return (
    <section className="book-ticket">
      <div className="bt-topbar">
        <div className="bt-topbar-inner">
          <div className="bt-topitem">📋 PNR STATUS</div>
          <div className="bt-topitem">📄 CHARTS / VACANCY</div>
        </div>
      </div>

      <div className="bt-container">
        <h1 className="bt-title">BOOK TICKET</h1>

        <form className="bt-form" onSubmit={handleSubmit}>
          <div className="bt-row bt-from-to">
            <div className="bt-field">
              <label>From</label>
              <div className="input-with-icon">
                <span className="input-icon">✈️</span>
                <input name="from" value={formData.from} onChange={handleChange} placeholder="From" />
              </div>
            </div>

            <button type="button" className="bt-swap" onClick={swapFromTo} aria-label="swap">
              ⇄
            </button>

            <div className="bt-field">
              <label>To</label>
              <div className="input-with-icon">
                <span className="input-icon">📍</span>
                <input name="to" value={formData.to} onChange={handleChange} placeholder="To" />
              </div>
            </div>
          </div>

          <div className="bt-row">
            <div className="bt-field">
              <label>DD/MM/YYYY *</label>
              <div className="input-with-icon">
                <span className="input-icon">📅</span>
                <input type="date" name="date" value={formData.date} onChange={handleChange} />
              </div>
            </div>

            <div className="bt-field">
              <label>&nbsp;</label>
              <div className="input-with-icon">
                <span className="input-icon">💼</span>
                <select name="travelClass" value={formData.travelClass} onChange={handleChange}>
                  <option>All Classes</option>
                  <option>1A</option>
                  <option>2A</option>
                  <option>3A</option>
                  <option>SL</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bt-row">
            <div className="bt-field full">
              <label>&nbsp;</label>
              <select name="tatkal" value={formData.tatkal} onChange={handleChange}>
                <option value="">TATKAL</option>
                <option value="general">General</option>
                <option value="tatkal">Tatkal</option>
                <option value="First Class">First Class</option>
              </select>
            </div>
          </div>

          <div className="bt-checkboxes">
            <label>
              <input type="checkbox" name="pwd" checked={formData.pwd} onChange={handleChange} /> Person With Disability Concession
            </label>
            <label>
              <input type="checkbox" name="flexible" checked={formData.flexible} onChange={handleChange} /> Flexible With Date
            </label>
            <label>
              <input type="checkbox" name="passConcession" checked={formData.passConcession} onChange={handleChange} /> Railway Pass Concession
            </label>
          </div>

          <div className="bt-cta">
            <button className="search-btn" type="submit">
              Search Trains
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default BookTicket;
