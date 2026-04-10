'use client'

import { ArrowRight, CheckCircle2, Loader2, Mail } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbzS96621EOfKkPBQvxSfNBDwHvsrbwfSIvyAmrQajFB3vXoloBPRUI0PDEoaRAFtBkY/exec";

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!GOOGLE_SHEET_URL) {
      alert("Please configure the Google Sheet Web App URL in the code.");
      return;
    }

    setStatus('idle');
    setIsLoading(true);

    const formData = {
      name,
      email,
      message,
    };

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Script Web App
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Note: 'no-cors' mode always returns an opaque response with status 0
      // We assume success if no error is thrown
      setIsLoading(false);
      setStatus('success');
      setName(""); setEmail(""); setMessage("");
      setTimeout(() => setStatus('idle'), 5000); 
    } catch (err) {
      console.error("Submission error:", err);
      setIsLoading(false);
      setStatus('error');
    }
  };

  return (
    <section className="relative min-h-screen bg-background font-notion selection:bg-notion-blue/20 selection:text-notion-blue">
      <div className=" px-6 md:px-16 lg:px-32 py-24  lg:flex lg:gap-24 lg:py-32">
        
        {/* LEFT COLUMN: NARRATIVE & FORM */}
        <div className="flex-1 space-y-12">
          <header className="space-y-4">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs font-medium uppercase tracking-notion-badge text-notion-blue"
            >
              Available for projects
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-medium tracking-notion-display text-foreground"
            >
              Let’s create <span className="text-notion-blue">magic.</span>
            </motion.h1>
          </header>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="group relative">
                <Input 
                  placeholder="Your Name" 
                  className="h-16 border-0 border-b-2 border-border bg-transparent text-lg transition-all focus:border-notion-blue focus:ring-0" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="group relative">
                <Input 
                  placeholder="Email Address" 
                  type="email"
                  className="h-16 border-0 border-b-2 border-border bg-transparent text-lg transition-all focus:border-notion-blue focus:ring-0" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="group relative">
              <Textarea
                placeholder="Tell me about your vision..."
                className="min-h-[200px] border-0 border-b-2 border-border bg-transparent text-lg transition-all focus:border-notion-blue focus:ring-0 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center gap-6">
              <Button
                disabled={isLoading}
                className="group h-16 rounded-pill bg-foreground px-10 text-lg hover:bg-notion-blue transition-all duration-500 disabled:bg-muted font-medium"
              >
                {isLoading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <span className="flex items-center gap-2">
                    Send Proposal <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>

              <AnimatePresence>
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-notion-blue font-medium"
                  >
                    <CheckCircle2 size={20} /> Sent successfully
                  </motion.div>
                )}
              </AnimatePresence>
              
              {status === 'error' && (
                <p className="text-red-500 font-medium">Something went wrong. Please try again.</p>
              )}
            </div>
          </form>

          {/* SOCIAL & DIRECT CONTACT */}
          <footer className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 ">
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-notion-badge text-muted-foreground font-medium">Direct</p>
              <Link href="mailto:mdonavan33@gmail.com" className="group flex items-center gap-3 text-xl font-medium hover:text-notion-blue transition-colors text-foreground">
                <div className="p-3 bg-card shadow-sm border whisper-border rounded-lg group-hover:bg-notion-blue-badge transition-colors">
                  <Mail size={20} className="text-foreground" />
                </div>
                mdonavan33@gmail.com
              </Link>
            </div>
            
            <div className="space-y-4">
              <p className="text-[10px] uppercase tracking-notion-badge text-muted-foreground font-medium">Social Architecture</p>
              <div className="flex gap-4">
                {['Instagram', 'LinkedIn', 'Dribbble'].map((platform) => (
                  <Link 
                    key={platform}
                    href="#" 
                    className="px-4 py-2 rounded-lg border whisper-border text-sm font-medium hover:bg-foreground hover:text-background transition-all"
                  >
                    {platform}
                  </Link>
                ))}
              </div>
            </div>
          </footer>
        </div>

        {/* RIGHT COLUMN: STICKY VISUAL */}
        <div className="hidden lg:block lg:w-1/3">
          <div className="sticky top-32 aspect-[3/4] overflow-hidden rounded-lg bg-muted notion-shadow-deep border whisper-border">
            <Image
              src="https://framerusercontent.com/images/m7Y04Zn4vrUsc7UeQIVInA2Afv0.jpg?scale-down-to=1024"
              alt="Hosanna"
              fill
              className="object-cover transition-transform duration-[2s] hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;