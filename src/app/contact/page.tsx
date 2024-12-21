'use client'

import { ArrowRight } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import React, { useState, FormEvent } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import emailjs from '@emailjs/browser';

const ContactPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (!email) {
      setError("Please enter your email");
      return;
    }
    if (!message) {
      setError("Please enter your message");
      return;
    }

    const templateParams = {
      from_name: name,
      from_email: email,
      to_name: "Hosanna DUSHIME",
      message,
    };

    setIsLoading(true);

    try {
      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      );
      setIsLoading(false);
      setSuccess("Message sent successfully!");
      setName("");
      setEmail("");
      setMessage("");
      console.log(response);
    } catch (err) {
      setIsLoading(false);
      setError("Failed to send message, please try again later.");
      console.error(err);
    }
  };

  return (
    <section className="mb-32 flex flex-col-reverse px-8 md:flex-row md:px-16 lg:px-32">
      <div className="mt-16 flex min-h-96 flex-col gap-8">
        <h3>Contact</h3>
        <h1 className="font-indie font-thin capitalize">✉️ call me maybe?</h1>
        <h4 className="w-2/3 font-medium">
          I&apos;d love to hear from you! Okay, but emails work just as good.
        </h4>
        <div className="flex flex-col gap-4">
          <Label className="flex flex-col gap-4 text-3xl">
            <h2 className="font-indie text-3xl"></h2>
            <Link
              href="mailto:mdonavan33@gmail.com"
              className="group flex w-full justify-between pr-4 text-xl"
            >
              mdonavan33@gmail.com
              <ArrowRight className="duration-700 group-hover:-rotate-45" />
            </Link>
          </Label>
          <Label className="flex flex-col gap-4 text-3xl">
            <p className="font-indie">Social</p>
            <Link
              href="https://www.instagram.com/__matt360/"
              className="group flex flex-row justify-between p-4 text-lg"
            >
              @__matt360
              <ArrowRight className="duration-700 group-hover:rotate-45" />
            </Link>
            <Link
              href="https://www.linkedin.com/in/dushime-aime-hosanna-32763625a/"
              className="group flex flex-row justify-between p-4 text-lg"
            >
              Linkedin
              <ArrowRight className="duration-700 group-hover:rotate-45" />
            </Link>
            <Link
              href="https://dribbble.com/DMATT250__"
              className="group flex flex-row justify-between p-4 text-lg"
            >
              Dribbble
              <ArrowRight className="duration-700 group-hover:rotate-45" />
            </Link>
          </Label>
        </div>
        <form onSubmit={sendEmail} className="flex flex-col gap-4">
          <div className="flex w-full flex-col  md:flex-row gap-4">
            <Label className="w-full md:w-1/2">
              <Input 
                placeholder="name" 
                className="p-6" 
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Label>
            <Label className="w-full md:w-1/2">
              <Input 
                placeholder="email" 
                className="p-6" 
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Label>
          </div>
          <Label className="w-full">
            <Textarea
              placeholder="message"
              rows={8}
              className="p-6"
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Label>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <Button
            variant="gooeyRight"
            className="rounded-full py-8"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Sending...' : 'Send messages💬'}
          </Button>
        </form>
      </div>
      <div className="group relative grid w-full md:w-1/2 max-md:h-96 place-items-center md:p-16">
        <Image
          src="https://framerusercontent.com/images/m7Y04Zn4vrUsc7UeQIVInA2Afv0.jpg?scale-down-to=1024"
          alt="Matt's face"
          fill
          className="origin-top-left max-md:scale-100 scale-75 object-contain duration-700 md:group-hover:-rotate-12"
        />
      </div>
    </section>
  );
};

export default ContactPage;

