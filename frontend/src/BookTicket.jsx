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
    doSearch()
  };

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState([])
  const [message, setMessage] = useState(null)

  async function doSearch() {
    setMessage(null)
    setLoading(true)
    setResults([])
    try {
      const res = await fetch('http://localhost:5000/api/search-trains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) throw new Error('Search failed')
      const json = await res.json()
      setResults(json.results || [])
    } catch (err) {
      console.error(err)
      setMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  async function bookTrain(train) {
    setMessage(null)
    try {
      const res = await fetch('http://localhost:5000/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ train, passenger: formData }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error || 'Booking failed')
      }
      const data = await res.json()
      setMessage(`Booked — confirmation ${data.bookingId}`)
    } catch (err) {
      console.error(err)
      setMessage(err.message)
    }
  }

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

        <div className="bt-results">
          {loading && <div className="bt-loading">Searching trains…</div>}
          {message && <div className="bt-message">{message}</div>}
          {results.length > 0 && (
            <div className="bt-list">
              <h2>Results</h2>
              <ul>
                {results.map((t) => (
                  <li key={t.id} className="bt-item">
                    <div className="bt-item-left">
                      <strong>{t.name}</strong> <span className="muted">{t.id}</span>
                      <div>{t.from} → {t.to} • {t.date}</div>
                      <div>Departs: {t.depart} • Arrives: {t.arrive}</div>
                    </div>
                    <div className="bt-item-right">
                      <div className="bt-fare">Fare: {t.fare ?? 'select class'}</div>
                      <button onClick={() => bookTrain(t)}>Book</button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookTicket;
