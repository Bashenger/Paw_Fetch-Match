import { useState } from 'react';

const VENUES = [
  { id: 'ballroom', name: 'Grand Ballroom', capacity: 300, price: '₹4,500/hr' },
  { id: 'lounge', name: 'Sky Lounge Rooftop', capacity: 80, price: '₹2,500/hr' },
  { id: 'conference', name: 'Executive Boardroom', capacity: 25, price: '₹750/hr' },
  { id: 'garden', name: 'Secret Garden Terrace', capacity: 150, price: '₹1,800/hr' }
];

export default function VenueBooking() {
  const initialFormState = {
    fullName: '',
    email: '',
    venueType: 'ballroom',
    date: '',
    guestCount: '',
    specialNotes: ''
  };

  const [booking, setBooking] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [bookingsList, setBookingsList] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const tempErrors = {};
    if (!booking.fullName.trim()) {
      tempErrors.fullName = 'Full name is required';
    } else if (booking.fullName.trim().length < 3) {
      tempErrors.fullName = 'Name must be at least 3 characters';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!booking.email.trim()) {
      tempErrors.email = 'Email is required';
    } else if (!emailRegex.test(booking.email)) {
      tempErrors.email = 'Please enter a valid email address';
    }

    if (!booking.date) {
      tempErrors.date = 'Booking date is required';
    } else {
      const selectedDate = new Date(booking.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        tempErrors.date = 'Booking date cannot be in the past';
      }
    }

    const selectedVenue = VENUES.find(v => v.id === booking.venueType);
    if (!booking.guestCount) {
      tempErrors.guestCount = 'Guest count is required';
    } else {
      const count = parseInt(booking.guestCount, 10);
      if (isNaN(count) || count <= 0) {
        tempErrors.guestCount = 'Guest count must be greater than 0';
      } else if (selectedVenue && count > selectedVenue.capacity) {
        tempErrors.guestCount = `Maximum capacity for this venue is ${selectedVenue.capacity} guests`;
      }
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBooking(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear field error as user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newBooking = {
        ...booking,
        id: Date.now(),
        venueName: VENUES.find(v => v.id === booking.venueType)?.name || booking.venueType,
        timestamp: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };
      setBookingsList(prev => [newBooking, ...prev]);
      setIsSuccess(true);
      setBooking(initialFormState);
      setErrors({});
      // Auto fade-out success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }
  };

  const handleReset = () => {
    setBooking(initialFormState);
    setErrors({});
    setIsSuccess(false);
  };

  const selectedVenue = VENUES.find(v => v.id === booking.venueType);

  return (
    <div className="venue-booking-container">
      <header className="booking-header">
        <h1>Venue Reserve</h1>
        <p className="subtitle">Select your premium space, customize configurations, and get instant access passes.</p>
      </header>

      <main className="booking-grid">
        {/* Left Form Area */}
        <section className="form-card-container">
          <div className="booking-card form-card">
            <h2 className="card-title">Reservation Details</h2>
            <form onSubmit={handleSubmit} noValidate>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={booking.fullName}
                  onChange={handleChange}
                  placeholder="e.g., Alexander Mercer"
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-message">{errors.fullName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={booking.email}
                  onChange={handleChange}
                  placeholder="e.g., alex@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="venueType">Select Venue</label>
                  <select
                    id="venueType"
                    name="venueType"
                    value={booking.venueType}
                    onChange={handleChange}
                  >
                    {VENUES.map(venue => (
                      <option key={venue.id} value={venue.id}>
                        {venue.name} ({venue.price})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="date">Booking Date</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={booking.date}
                    onChange={handleChange}
                    className={errors.date ? 'error' : ''}
                  />
                  {errors.date && <span className="error-message">{errors.date}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="guestCount">
                  Guest Count 
                  {selectedVenue && <span className="capacity-label"> (Max capacity: {selectedVenue.capacity})</span>}
                </label>
                <input
                  type="number"
                  id="guestCount"
                  name="guestCount"
                  value={booking.guestCount}
                  onChange={handleChange}
                  placeholder={`Max: ${selectedVenue?.capacity || 100}`}
                  className={errors.guestCount ? 'error' : ''}
                />
                {errors.guestCount && <span className="error-message">{errors.guestCount}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="specialNotes">Special Requests (Optional)</label>
                <textarea
                  id="specialNotes"
                  name="specialNotes"
                  value={booking.specialNotes}
                  onChange={handleChange}
                  placeholder="e.g., Catering, projector screen setup, valet service, live music stage..."
                  rows="3"
                />
              </div>

              <div className="button-group">
                <button type="button" className="btn-secondary" onClick={handleReset}>
                  Reset
                </button>
                <button type="submit" className="btn-primary">
                  Confirm Booking
                </button>
              </div>

              {isSuccess && (
                <div className="success-toast">
                  🎉 Booking registered successfully! Your access pass is generated below.
                </div>
              )}
            </form>
          </div>
        </section>

        {/* Right Preview Area */}
        <section className="preview-card-container">
          <div className="preview-sticky">
            <h2 className="card-title text-center">Live Pass Preview</h2>
            
            {/* The Booking Pass Ticket */}
            <div className="booking-pass">
              <div className="pass-header">
                <div className="brand">
                  <span className="logo-icon">🎟️</span> VENUE PASS
                </div>
                <div className="pass-status-badge">
                  {booking.fullName ? 'DRAFT PASS' : 'EMPTY'}
                </div>
              </div>

              <div className="pass-body">
                <div className="pass-row">
                  <div className="pass-col">
                    <span className="label">BOOKED FOR</span>
                    <span className="value truncate">
                      {booking.fullName.trim() || <span className="placeholder-text">Guest Name</span>}
                    </span>
                  </div>
                  <div className="pass-col">
                    <span className="label">VENUE SPACE</span>
                    <span className="value">
                      {VENUES.find(v => v.id === booking.venueType)?.name}
                    </span>
                  </div>
                </div>

                <div className="pass-row">
                  <div className="pass-col">
                    <span className="label">DATE OF EVENT</span>
                    <span className="value">
                      {booking.date ? new Date(booking.date).toLocaleDateString('en-US', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }) : <span className="placeholder-text">Select Date</span>}
                    </span>
                  </div>
                  <div className="pass-col">
                    <span className="label">ATTENDEES</span>
                    <span className="value">
                      {booking.guestCount ? `${booking.guestCount} / ${selectedVenue?.capacity}` : <span className="placeholder-text">—</span>}
                    </span>
                  </div>
                </div>

                <div className="pass-row notes-row">
                  <div className="pass-col full-width">
                    <span className="label">ADDITIONAL ACCESS REQUIREMENTS</span>
                    <span className="value notes-value">
                      {booking.specialNotes.trim() || 'No special requirements specified.'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Ticket Jagged / Tear Border */}
              <div className="ticket-divider">
                <div className="circle circle-left"></div>
                <div className="dashed-line"></div>
                <div className="circle circle-right"></div>
              </div>

              <div className="pass-footer">
                <div className="pass-row">
                  <div className="pass-col">
                    <span className="label">EMAIL ADDRESS</span>
                    <span className="value truncate">
                      {booking.email.trim() || <span className="placeholder-text">no-email@venue.com</span>}
                    </span>
                  </div>
                  <div className="pass-col text-right">
                    <span className="label">TICKET RATE</span>
                    <span className="value price-tag">{selectedVenue?.price}</span>
                  </div>
                </div>

                {/* Mock Barcode */}
                <div className="barcode-container">
                  <div className="barcode">
                    <div className="bar thin"></div>
                    <div className="bar thick"></div>
                    <div className="bar mid"></div>
                    <div className="bar thin"></div>
                    <div className="bar thick"></div>
                    <div className="bar thin"></div>
                    <div className="bar mid"></div>
                    <div className="bar thick"></div>
                    <div className="bar thin"></div>
                    <div className="bar mid"></div>
                    <div className="bar thin"></div>
                  </div>
                  <span className="barcode-number">#CONF-{booking.date ? booking.date.replace(/-/g, '') : 'YYYYMMDD'}-{booking.venueType.toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Confirmed Bookings Section */}
      {bookingsList.length > 0 && (
        <section className="confirmed-bookings-section">
          <h2 className="section-title">Confirmed Reservations ({bookingsList.length})</h2>
          <div className="bookings-history-grid">
            {bookingsList.map((item) => (
              <div key={item.id} className="confirmed-ticket-card">
                <div className="confirmed-header">
                  <div>
                    <span className="badge-confirmed">CONFIRMED</span>
                    <h3>{item.venueName}</h3>
                  </div>
                  <span className="booking-time">{item.timestamp}</span>
                </div>
                <div className="confirmed-details">
                  <div>
                    <strong>Host:</strong> {item.fullName} ({item.email})
                  </div>
                  <div>
                    <strong>Date:</strong> {new Date(item.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div>
                    <strong>Guests:</strong> {item.guestCount}
                  </div>
                  {item.specialNotes && (
                    <div className="confirmed-notes">
                      <strong>Notes:</strong> {item.specialNotes}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
