import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1.5 } },
};

const Landing = () => {
  return (
    <div className="bg-linear-to-b from-blue-50 via-white to-blue-100 text-gray-800 min-h-screen overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 text-xl font-bold">
          <img src="/logo.jpg" className="w-10 h-10 rounded-lg" />
          DevHub
        </div>

        <div className="flex gap-4 items-center">
          <Link to="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="bg-linear-to-b from-blue-50 via-blue-50 to-white text-center px-4 py-16 md:py-16 w-full mx-auto">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={fadeUp}
          className="text-4xl sm:text-5xl font-bold leading-tight"
        >
          Connect with Developers.
          <br />
          <span className="text-blue-600">Build Your Network.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          className="mt-6 text-gray-600 text-lg"
        >
          DevHub helps you connect, collaborate, and grow with developers
          worldwide.
        </motion.p>

        <motion.div className="mt-8 flex justify-center gap-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Join Now
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-100 transition"
          >
            Explore
          </Link>
        </motion.div>

        {/* HERO IMAGE */}
        <motion.img
          variants={fadeUp}
          initial = "hidden"
          whileInView="show"
          whileHover={{scale: 1.05}}
          src="https://orientaloutsourcing.com/wp-content/uploads/2026/01/Offshore-Development-in-India-A-Complete-Guide-for-Global-Companies.png"
          className="mt-12 rounded-2xl shadow-xl mx-auto w-full max-w-4xl transition duration-300"
        />
      </section>
      {/* FEATURES */}
      <div className="bg-linear-to-b from-white to-blue-50">
        <section className=" max-w-6xl mx-auto px-4 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "Smart Developer Matching",
            "Real-time Chat System",
            "Collaborative Growth",
          ].map((title, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              whileHover={{ scale: 1.05 }}
              className=" border border-gray-200 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-gray-600 text-sm">
                Experience next-gen networking with powerful tools.
              </p>
            </motion.div>
          ))}
        </section>
      </div>
      {/* USE CASE */}
      {/* USE CASE 1 */}
      <div className="bg-linear-to-b from-blue-50 to-white">
        <section className="max-w-6xl mx-auto px-4 py-16  md:py-20 grid md:grid-cols-2 gap-10 items-center ">
          <motion.img
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
            src="https://blogs.opentext.com/wp-content/uploads/2022/08/shutterstock_2128117100-1200x675-1-1024x576.jpg"
            className="rounded-2xl shadow-lg"
          />

          <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Find the right people for your ideas
            </h3>
            <p className="text-gray-600">
              Whether you're building a startup or side project — DevHub helps
              you connect instantly.
            </p>
          </motion.div>
        </section>
      </div>
      {/* USE CASE 2 */}
      <div className="bg-linear-to-b from-white via-blue-50 to-blue-50">
        <section className="max-w-6xl mx-auto px-4 py-16  md:py-20 grid md:grid-cols-2 gap-10 items-center">
          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-semibold mb-4">
              Seamless real-time conversations
            </h3>
            <p className="text-gray-600">
              Chat instantly with your connections, share ideas, and collaborate
              in real-time — just like modern messaging platforms.
            </p>

            <ul className="mt-4 space-y-2 text-sm text-gray-500">
              <li>✔️ Instant messaging</li>
              <li>✔️ Smooth chat experience</li>
              <li>✔️ Developer-focused communication</li>
            </ul>
          </motion.div>

          {/* IMAGE */}
          <motion.img
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            src="https://img.freepik.com/premium-photo/software-developer-talking-people-remote-videoconference-with-webcam-attending-online-videocall-meeting-internet-chatting-about-code-programming-teleconference-office_482257-55301.jpg"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </section>
        <section className="bg-linear-to-b from-blue-50  to-white py-16 md:py-16 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
            <motion.img
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71"
              className="rounded-2xl shadow-lg"
            />
            <motion.div
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          >
              <h3 className="text-2xl font-semibold mb-4">
                Smart Matching Algorithm
              </h3>
              <p className="text-gray-600">
                DevHub connects you with developers based on skills, interests,
                and goals — so every connection actually matters.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      <section className="bg-linear-to-b from-white to-blue-50 py-16 md:py-16 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">Go Premium 🚀</h2>

          <p className="text-gray-600 mt-3">
            Unlock the full power of DevHub and grow faster as a developer
          </p>

          {/* Card */}
          <div className="mt-12 max-w-md mx-auto bg-white border rounded-2xl p-8 shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-4">Premium Membership</h3>

            {/* Price */}
            <p className="text-3xl font-bold text-blue-600 mb-4">
              ₹199<span className="text-sm text-gray-500"> / month</span>
            </p>

            {/* Features */}
            <ul className="text-gray-600 space-y-3 text-sm text-left">
              <li>✔️ Blue Tick Verification</li>
              <li>✔️ Unlimited Connection Requests</li>
              <li>✔️ Real-time Chat Access</li>
              <li>✔️ Higher Profile Visibility</li>
              <li>✔️ Early Access to New Features</li>
            </ul>

            {/* CTA */}
            <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
              Upgrade to Premium
            </button>
          </div>
        </div>
      </section>
      <section className="relative py-16 md:py-16 px-4 bg-linear-to-b from-blue-50 to-white">
        {/* subtle background divider */}
        <div className="absolute inset-0  -z-10" />

        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800">How DevHub Works</h2>

          <p className="text-gray-500 mt-2">
            Get started in seconds and start building real connections
          </p>

          {/* Steps */}

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Create Profile",
                desc: "Set up your developer profile with skills & interests",
                icon: "👤",
              },
              {
                title: "Connect",
                desc: "Swipe and find developers matching your goals",
                icon: "🤝",
              },
              {
                title: "Collaborate",
                desc: "Chat instantly and build projects together",
                icon: "💬",
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                whileHover={{ scale: 1.05 }}
                className=" border border-gray-100 bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition group"
              >
                <div className="text-3xl mb-3">{step.icon}</div>

                <h3 className="font-semibold text-lg text-gray-800">
                  {step.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">{step.desc}</p>

                {/* step number */}
                <div className="mt-4 text-blue-600 font-bold text-lg opacity-70">
                  0{i + 1}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-16 px-4 text-center bg-linear-to-b from-white to-blue-50">
        <h2 className="text-3xl font-bold text-gray-800">
          Loved by Developers ❤️
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mt-12 max-w-6xl mx-auto">
          {[
            "Found my startup co-founder here!",
            "Best platform to connect with devs",
            "Way better than random networking",
          ].map((text, i) => (
            <div key={i} className=" p-6 rounded-2xl shadow-sm bg-white">
              <p className="text-gray-600">“{text}”</p>
            </div>
          ))}
        </div>
      </section>
      <section className="py-16 md:py-16 px-4 bg-linear-to-b from-blue-50 via-blue-50 to-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800">FAQs</h2>

          <div className="mt-10 space-y-6">
            <div>
              <h4 className="font-semibold">Is DevHub free?</h4>
              <p className="text-gray-600 text-sm">
                Yes, you can use basic features for free.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">What does premium offer?</h4>
              <p className="text-gray-600 text-sm">
                More visibility, unlimited requests, and better connections.
              </p>
            </div>

            <div>
              <h4 className="font-semibold">Can I collaborate on projects?</h4>
              <p className="text-gray-600 text-sm">
                Yes, DevHub is built for collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* COMMUNITY */}
      <section className="py-16 md:py-16  px-4 bg-linear-to-b from-white to-blue-50 text-center">
        <h2 className="text-3xl font-bold">Built for Developers 🌍</h2>

        <div className="mt-10 flex justify-center gap-10">
          <div>
            <h3 className="text-2xl font-bold text-blue-600">10K+</h3>
            <p className="text-gray-600 text-sm">Developers</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-600">50K+</h3>
            <p className="text-gray-600 text-sm">Connections</p>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-blue-600">5K+</h3>
            <p className="text-gray-600 text-sm">Projects</p>
          </div>
        </div>
      </section>
      <section className="py-24 px-4 text-center bg-linear-to-b from-blue-50 to-blue-100">
        <h2 className="text-4xl font-bold text-gray-800">
          Start building your developer network today 🚀
        </h2>

        <p className="text-gray-600 mt-3">
          Join DevHub and connect with amazing developers
        </p>

        <Link
          to="/login"
          className="inline-block mt-8 px-8 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        >
          Get Started Now
        </Link>
      </section>
    </div>
  );
};

export default Landing;
