import { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const sendWhatsApp = (e) => {
    e.preventDefault();

    const phoneNumber = "918240481762";

    const text = `
*New Website Enquiry*

👤 Name: ${form.name}

📞 Phone: ${form.phone}

📧 Email: ${form.email || "Not Provided"}

📝 Message:
${form.message}
`;

    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`,
      "_blank",
    );

    setForm({
      name: "",
      phone: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="bg-[#F8F5F0] pt-24 sm:pt-28 md:pt-32 lg:pt-36 pb-16 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Heading */}

        <div className="text-center mb-16">
          <p className="uppercase tracking-[0.35em] text-sm text-neutral-500">
            Get In Touch
          </p>

          <h2
            className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold text-[#565656]"
          >
            Contact Us
          </h2>

          <p className="mt-5 max-w-2xl mx-auto text-neutral-600 leading-8">
            We'd love to hear about your upcoming project. Reach out through
            WhatsApp or fill in the enquiry form.
          </p>
        </div>

        {/* Main Section */}

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Card */}

          <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-10">
            <h3 className="text-2xl font-semibold text-[#565656] mb-8">
              Contact Information
            </h3>

            <div className="space-y-8">
              {/* Address */}

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-[#EFE8DD] flex items-center justify-center">
                  <MapPin className="text-[#565656]" />
                </div>

                <div>
                  <h4 className="font-semibold text-[#565656] mb-2">Address</h4>

                  <p className="text-neutral-600 leading-7">
                    A3, 736, Paschim Nischintapur, Boral,
                    <br />
                    Rajpur Sonarpur, Kolkata - 700154.
                  </p>
                </div>
              </div>

              {/* Phone */}

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-[#EFE8DD] flex items-center justify-center">
                  <Phone className="text-[#565656]" />
                </div>

                <div>
                  <h4 className="font-semibold text-[#565656] mb-2">Phone</h4>

                  <a
                    href="tel:+918240481762"
                    className="text-neutral-600 hover:text-black transition"
                  >
                    +91 8240481762
                  </a>
                </div>
              </div>

              {/* Email */}

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-[#EFE8DD] flex items-center justify-center">
                  <Mail className="text-[#565656]" />
                </div>

                <div>
                  <h4 className="font-semibold text-[#565656] mb-2">Email</h4>

                  <a
                    href="mailto:hello@dreamcatcher.studio"
                    className="text-neutral-600 hover:text-black transition"
                  >
                    hello@dreamcatcher.studio
                  </a>
                </div>
              </div>

              {/* Working Hours */}

              <div className="flex gap-5">
                <div className="w-12 h-12 rounded-full bg-[#EFE8DD] flex items-center justify-center">
                  <Clock className="text-[#565656]" />
                </div>

                <div>
                  <h4 className="font-semibold text-[#565656] mb-2">
                    Working Hours
                  </h4>

                  <p className="text-neutral-600">
                    Monday - Sunday
                    <br />
                    9:00 AM – 9:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form */}

          <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-10">
            <h3 className="text-2xl font-semibold text-[#565656] mb-8">
              Enquiry Form
            </h3>

            <form onSubmit={sendWhatsApp} className="space-y-6">
              <input
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full rounded-xl border border-neutral-300 px-5 py-4 outline-none focus:border-black"
              />

              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full rounded-xl border border-neutral-300 px-5 py-4 outline-none focus:border-black"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email (Optional)"
                className="w-full rounded-xl border border-neutral-300 px-5 py-4 outline-none focus:border-black"
              />

              <textarea
                rows={6}
                name="message"
                required
                value={form.message}
                onChange={handleChange}
                placeholder="Tell us about your project..."
                className="w-full rounded-xl border border-neutral-300 px-5 py-4 outline-none focus:border-black resize-none"
              />

              <button
                type="submit"
                className="
                w-full
                rounded-full
                bg-gradient-to-r
                from-[#7C3AED]
                to-[#06B6D4]
                py-4
                text-white
                font-semibold
                flex
                justify-center
                items-center
                gap-3
                hover:scale-[1.02]
                transition
                duration-300
                "
              >
                <Send size={18} />
                Send Enquiry via WhatsApp
              </button>
            </form>
          </div>
        </div>

        {/* Google Map Placeholder */}

        <div className="mt-20">
          <h3
            className="text-center text-3xl md:text-4xl font-light text-[#565656] mb-8"
            style={{
              fontFamily: "Cormorant Garamond, serif",
            }}
          >
            Find Us On Map
          </h3>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-xl border border-neutral-200 bg-white">
          {/* Replace the src value with your Google Maps Embed Link */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1879905.971051737!2d86.4992122239112!3d23.035102295081572!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0271c065ba1eb1%3A0xb9ad59b560677bf7!2sDREAMCATCHER%20STUDIO!5e0!3m2!1sen!2sin!4v1785997582734!5m2!1sen!2sin"
            className="w-full h-[320px] sm:h-[400px] md:h-[450px] lg:h-[500px] border-0"
            loading="lazy"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
