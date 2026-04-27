export default function Home() {
  return (
    <main className="container">
      <div className="hero">
        <h1>DJ Ivan Pashkulev</h1>
        <p className="tagline">Professional DJ Services in Bansko, Bulgaria</p>
        <div className="cta">
          <a href="#booking" className="btn-primary">Book Now</a>
        </div>
      </div>

      <section id="about" className="section">
        <h2>About</h2>
        <p>
          Bringing energy and unforgettable moments to your events in Bansko and across Bulgaria.
          Specialized in weddings, corporate events, and private parties.
        </p>
      </section>

      <section id="booking" className="section">
        <h2>Book Your Event</h2>
        <p>Contact us to check availability and get a quote for your event.</p>
        <form className="booking-form">
          <input type="text" placeholder="Your Name" required />
          <input type="email" placeholder="Email" required />
          <input type="date" placeholder="Event Date" required />
          <textarea placeholder="Tell us about your event" rows={4} required></textarea>
          <button type="submit" className="btn-primary">Send Request</button>
        </form>
      </section>
    </main>
  )
}
