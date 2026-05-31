import { useState } from "react";
import toast from "react-hot-toast";

function Subscription() {
  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    toast.success(`Thanks! We'll send updates to ${email}.`);

    setEmail("");
  };

  return (
    <div className="mx-auto">
      <div className="relative isolate overflow-hidden px-6 py-10 shadow bg-[#1e2126]">
        <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl text-white">
          Get the Latest Eats
        </h2>

        <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 text-gray-300">
          Subscribe to our newsletter for fresh restaurant recommendations delivered to your inbox.
        </p>

        <form
          className="mx-auto mt-10 flex max-w-md gap-x-4"
          onSubmit={handleSubmit}
        >
          <label htmlFor="email-address" className="sr-only">
            Subscribe
          </label>

          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 flex-auto rounded-md bg-white px-3.5 py-2 text-black shadow-sm sm:text-sm sm:leading-6"
            placeholder="Enter your email"
          />

          <button
            type="submit"
            className="flex-none rounded-md bg-[#cca353] px-3.5 py-2.5 text-sm font-semibold border-0 text-white shadow-sm hover:bg-[#a7874b]"
          >
            Notify me
          </button>
        </form>
      </div>
    </div>
  );
}

export default Subscription;