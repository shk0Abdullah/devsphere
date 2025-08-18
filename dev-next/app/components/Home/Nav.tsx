"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "../../config/firebase";
import { serverTimestamp } from "../../config/firebase";
export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPanel, setIsPanel] = useState(false);

  // Calendar states
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const nextAvailableDate = new Date(today);
  nextAvailableDate.setDate(today.getDate() + 1); // change to +7 if "next week only"

  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const toggleMenu = () => setIsMenuOpen((o) => !o);
  const closeMenu = () => setIsMenuOpen(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!selectedDate) {
      alert("Please select a date");
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);

    const bookingData = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      selectedDate: selectedDate.toISOString(),
      formattedDate: selectedDate.toDateString(),
      timestamp: serverTimestamp(),
    };

    try {
      setLoading(true);
      const docRef = await db.collection("bookings").add(bookingData);
      console.log("Booking saved with ID:", docRef.id);
      alert(`Booking confirmed!\n\nDate: ${bookingData.formattedDate}`);

      form.reset();
      setSelectedDate(null);
      setIsPanel(false);
    } catch (error) {
      console.error("Error saving booking:", error);
      alert("Error submitting booking. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  function generateCalendar(year: number, month: number) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const weeks: (Date | null)[][] = [];
    let date = 1;

    for (let i = 0; i < 6; i++) {
      const week: (Date | null)[] = [];
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < startingDay) {
          week.push(null);
        } else if (date > daysInMonth) {
          week.push(null);
        } else {
          week.push(new Date(year, month, date));
          date++;
        }
      }
      weeks.push(week);
      if (date > daysInMonth) break;
    }

    return weeks;
  }

  const calendarWeeks = generateCalendar(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  return (
    <>
      {/* NAVBAR */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 md:p-6">
        {/* Logo */}
        <div className="relative h-14 md:h-22 lg:h-20 w-36 md:w-44 lg:w-48">
          <Image
            src="/devsphere.png"
            alt="DevSphere logo"
            fill
            className="object-contain"
            priority
            sizes="1000px"
          />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex space-x-6 lg:space-x-8 text-gray-300">
          <a href="/" className="hover:text-white transition-colors">
            Home
          </a>
          <a href="/#impact" className="hover:text-white transition-colors">
            Impact
          </a>
          <a href="/#services" className="hover:text-white transition-colors">
            Services
          </a>
          <a href="/#whoweare" className="hover:text-white transition-colors">
            Who we are
          </a>
          <a href="/#whatwedo" className="hover:text-white transition-colors">
            What we do
          </a>
          <a href="/careers" className="hover:text-white transition-colors">
            Careers
          </a>
        </div>

        {/* Hamburger */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1"
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-x-1 translate-y-1" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-all duration-300 ${
              isMenuOpen ? "-rotate-45 translate-x-1 -translate-y-1" : ""
            }`}
          />
        </button>

        {/* Desktop CTA */}
        <button
          onClick={() => setIsPanel(true)}
          className="hidden md:block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 md:px-6 md:py-2 rounded-full transition-colors text-sm md:text-base"
        >
          Let&apos;s Talk
        </button>
      </div>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-10 bg-black/95 flex flex-col items-center justify-center h-full space-y-8 text-white text-xl transition-transform duration-300 md:hidden
          ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}`}
        onClick={(e) => e.target === e.currentTarget && closeMenu()}
      >
        <a href="/" onClick={closeMenu} className="hover:text-indigo-400">
          Home
        </a>
        <a
          href="/#impact"
          onClick={closeMenu}
          className="hover:text-indigo-400"
        >
          Impact
        </a>
        <a
          href="/#services"
          onClick={closeMenu}
          className="hover:text-indigo-400"
        >
          Services
        </a>
        <a
          href="/#whoweare"
          onClick={closeMenu}
          className="hover:text-indigo-400"
        >
          Who we are
        </a>
        <a
          href="/#whatwedo"
          onClick={closeMenu}
          className="hover:text-indigo-400"
        >
          What we do
        </a>
        <a
          href="/careers"
          onClick={closeMenu}
          className="hover:text-indigo-400"
        >
          Careers
        </a>

        <button
          onClick={() => setIsPanel(true)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-3 rounded-full"
        >
          Let&apos;s Talk
        </button>
      </div>

      {/* Booking Panel */}
      {isPanel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="container mx-auto p-4 max-w-4xl relative">
            <button
              onClick={() => setIsPanel(false)}
              className="btn btn-circle btn-sm absolute right-4 top-4 z-10"
            >
              ✕
            </button>

            <div className="card bg-black shadow-lg max-h-[90vh] overflow-y-auto">
              <div className="card-body">
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold text-primary">
                    Dev Sphere
                  </h1>
                  <h2 className="text-xl font-semibold mt-2">
                    Schedule a meeting with us
                  </h2>
                  <div className="flex justify-center items-center gap-2 mt-2 text-gray-600">
                    <span>30 Mins</span>
                    <span>•</span>
                    <span>
                      {selectedDate
                        ? selectedDate.toDateString()
                        : "Select a date"}
                    </span>
                    <span>•</span>
                    <span>America/Los_Angeles (PDT)</span>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Calendar */}
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">
                        {currentDate.toLocaleString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            setCurrentDate(
                              new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth() - 1
                              )
                            )
                          }
                          className="btn btn-sm btn-ghost"
                        >
                          ◀
                        </button>
                        <button
                          onClick={() =>
                            setCurrentDate(
                              new Date(
                                currentDate.getFullYear(),
                                currentDate.getMonth() + 1
                              )
                            )
                          }
                          className="btn btn-sm btn-ghost"
                        >
                          ▶
                        </button>
                      </div>
                    </div>

                    <table className="table">
                      <thead>
                        <tr>
                          {[
                            "Sun",
                            "Mon",
                            "Tue",
                            "Wed",
                            "Thu",
                            "Fri",
                            "Sat",
                          ].map((d) => (
                            <th key={d} className="text-center p-2">
                              {d}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {calendarWeeks.map((week, i) => (
                          <tr key={i}>
                            {week.map((day, j) => (
                              <td
                                key={j}
                                className={`text-center p-2 rounded 
                                  ${
                                    !day
                                      ? ""
                                      : day < nextAvailableDate
                                      ? "text-gray-500 cursor-not-allowed"
                                      : "cursor-pointer hover:bg-gray-300"
                                  }
                                  ${
                                    selectedDate &&
                                    day &&
                                    selectedDate.toDateString() ===
                                      day.toDateString()
                                      ? "bg-primary text-white"
                                      : ""
                                  }
                                  ${
                                    day &&
                                    day.toDateString() === today.toDateString()
                                      ? "font-bold text-primary"
                                      : ""
                                  }
                                `}
                                onClick={() => {
                                  if (day && day >= nextAvailableDate)
                                    setSelectedDate(day);
                                }}
                              >
                                {day ? day.getDate() : ""}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Form */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Enter Details
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <input
                        type="hidden"
                        value={selectedDate?.toISOString() || ""}
                      />

                      <div className="form-control">
                        <label className="label">First Name</label>
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">Last Name</label>
                        <input
                          type="text"
                          className="input input-bordered w-full"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">Email</label>
                        <input
                          type="email"
                          className="input input-bordered w-full"
                          required
                        />
                      </div>

                      <div className="form-control">
                        <label className="label">Phone with Country Code</label>
                        <input
                          type="tel"
                          className="input input-bordered w-full"
                          required
                        />
                      </div>

                      <div className="form-control mt-6">
                        <button
                          type="submit"
                          className="btn btn-primary"
                          disabled={!selectedDate || loading}
                        >
                          {loading ? "Saving..." : "Complete Your Reservation"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="divider"></div>

                <div className="text-center">
                  <h3 className="text-lg font-semibold">Talk To Us</h3>
                  <p className="text-gray-600 mt-2">
                    Have questions? We're here to help!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
