"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Landmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    category: "General Inquiry",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [submitError, setSubmitError] = useState("");

  const categories = [
    "General Inquiry",
    "Spatial Data / WFS Request",
    "Layer Error Reporting",
    "NWDP Feedback",
    "Technical Support",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;

    setIsLoading(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setTicketId(`WRIS-${Math.floor(100000 + Math.random() * 900000)}`);
        setIsSubmitted(true);
      } else {
        setSubmitError(data.error || "Failed to submit query. High volume detected, try again later.");
      }
    } catch (err: any) {
      console.error("[Error] UI Form submission error:", err);
      setSubmitError("Mail servers offline. Please try again in a few minutes.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      organization: "",
      category: "General Inquiry",
      message: "",
    });
    setSubmitError("");
    setIsSubmitted(false);
  };

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 py-12 px-6 md:px-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Hero */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-[10px] font-black tracking-[0.25em] text-primary-blue dark:text-cyan-400 uppercase bg-primary-blue/10 dark:bg-cyan-500/10 px-4 py-1.5 rounded-full inline-block">
            Support Portal
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mt-4 text-[#00376c] dark:text-white leading-tight">
            Connect with Hydro Informatics Unit
          </h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-3 font-medium leading-relaxed">
            Have questions about spatial data streams, WFS attributes, layer boundaries, or the National Water Development Programme? Send us a direct message.
          </p>
        </div>

        {/* Outer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Card left column: Office contact parameters */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-slate-900 border border-blue-100/50 dark:border-slate-800 p-8 rounded-2xl shadow-xl space-y-10">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold text-primary-blue dark:text-cyan-400 flex items-center gap-2">
                  <Landmark className="w-5 h-5" />
                  Office Headquarters
                </h3>
                <p className="text-xs text-gray-400 dark:text-slate-500 font-bold uppercase tracking-wider mt-1">
                  Water Resources Department • Govt of Assam
                </p>
              </div>

              {/* Geo Info Rows */}
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-xl text-primary-blue dark:text-cyan-400 border border-blue-100/40 dark:border-slate-700/50 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Address</h5>
                    <p className="text-sm text-gray-700 dark:text-slate-300 font-semibold mt-1">
                      Hydro Informatics Unit, 2nd Floor<br />
                      Assam Water Centre<br />
                      Kundil Nagar, Guwahati, Assam 781029
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-xl text-primary-blue dark:text-cyan-400 border border-blue-100/40 dark:border-slate-700/50 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Email Operations</h5>
                    <p className="text-sm text-gray-700 dark:text-slate-300 font-semibold mt-1 hover:text-primary-blue dark:hover:text-cyan-400 transition-colors">
                      support-wris@assam.gov.in<br />
                      hiu.wrd.assam@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-xl text-primary-blue dark:text-cyan-400 border border-blue-100/40 dark:border-slate-700/50 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Phone System</h5>
                    <p className="text-sm text-gray-700 dark:text-slate-300 font-semibold mt-1">
                      +91 361-2630245 <br />
                      <span className="text-xs text-gray-400 dark:text-slate-400 font-normal">Extension: Hydro-Informatics Desk</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-xl text-primary-blue dark:text-cyan-400 border border-blue-100/40 dark:border-slate-700/50 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Working Hours</h5>
                    <p className="text-sm text-gray-700 dark:text-slate-300 font-semibold mt-1">
                      Mon - Sat: 10:00 AM to 05:00 PM<br />
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-normal">Closed on Sundays & Govt Holidays</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Disclaimer / Notice */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border border-blue-50 dark:border-slate-800 rounded-xl text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-medium">
              <strong>Official Notice:</strong> Submissions are logged by the Hydro Informatics Unit for official records. Inquiries related to flood telemetry or gauge verification receive automated priority queues.
            </div>
          </div>

          {/* Card right column: Interactive dynamic contact form */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-blue-100/50 dark:border-slate-800 p-8 rounded-2xl shadow-xl relative overflow-hidden flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form 
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-955 border border-blue-100/30 dark:border-slate-75 *::placeholder-text-gray-300 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:bg-white dark:focus:ring-cyan-500 dark:focus:bg-slate-900 transition-all font-semibold"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john.doe@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-955 border border-blue-100/30 dark:border-slate-75 *::placeholder-text-gray-300 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:bg-white dark:focus:ring-cyan-500 dark:focus:bg-slate-900 transition-all font-semibold"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Organization */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                        Organization / Department
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Irrigation Board, IIT Guwahati"
                        value={form.organization}
                        onChange={(e) => setForm({ ...form, organization: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-955 border border-blue-100/30 dark:border-slate-75 *::placeholder-text-gray-300 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:bg-white dark:focus:ring-cyan-500 dark:focus:bg-slate-900 transition-all font-semibold"
                      />
                    </div>

                    {/* Query Category */}
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                        Inquiry Category
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-955 border border-blue-100/30 dark:border-slate-75 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:bg-white dark:focus:ring-cyan-500 dark:focus:bg-slate-900 font-semibold transition-all"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message body */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-slate-400">
                      Message Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      required
                      placeholder="Please record your detailed query here. For spatial maps, specify downstream catchment limits or shapefile request coordinate reference systems (CRS)..."
                      rows={5}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-955 border border-blue-100/30 dark:border-slate-75 dark:border-slate-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue focus:bg-white dark:focus:ring-cyan-500 dark:focus:bg-slate-900 transition-all font-semibold leading-relaxed"
                    />
                  </div>

                  {submitError && (
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/30 rounded-xl text-xs font-semibold leading-relaxed animate-in fade-in duration-200">
                      <strong>Submission Issue:</strong> {submitError}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#00376c] hover:bg-[#002f5c] dark:bg-cyan-500 dark:hover:bg-cyan-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 transition-all active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white dark:border-slate-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Secure Inquiry</span>
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center p-8 space-y-6"
                >
                  <div className="w-16 h-16 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-800 rounded-full flex items-center justify-center shadow-inner text-emerald-500 dark:text-emerald-400 animate-bounce">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-emerald-600 dark:text-emerald-400 tracking-tight">Security Session Submitted!</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400 mt-2 font-medium leading-relaxed">
                      Thank you. Your inquiry has been forwarded to our spatial operations queue. One of our engineers will follow up with you.
                    </p>
                  </div>

                  {/* Receipt Reference */}
                  <div className="bg-slate-50 dark:bg-slate-950 border border-blue-50 dark:border-slate-850 p-4 rounded-xl w-full max-w-sm space-y-1">
                    <span className="text-[9px] font-black tracking-widest text-slate-450 uppercase block">Ticket ID Reference</span>
                    <span className="text-base font-mono font-bold text-primary-gray dark:text-cyan-400 tracking-wider">
                      {ticketId}
                    </span>
                  </div>

                  <button
                    onClick={handleReset}
                    className="text-xs font-black text-gray-500 hover:text-primary-blue dark:text-slate-400 dark:hover:text-cyan-400 uppercase tracking-widest underline underline-offset-4 decoration-2"
                  >
                    Submit Another Query
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

        </div>

      </div>
    </div>
  );
}