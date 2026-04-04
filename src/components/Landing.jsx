import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 1.5 } },
};

const Landing = () => {
  return (
    <div className="bg-white text-gray-800 min-h-screen overflow-x-hidden">
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
      <section className="text-center px-4 py-20 max-w-5xl mx-auto">
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
            className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            Explore
          </Link>
        </motion.div>

        {/* HERO IMAGE */}
        <motion.img
          variants={fadeUp}
          src="https://orientaloutsourcing.com/wp-content/uploads/2026/01/Offshore-Development-in-India-A-Complete-Guide-for-Global-Companies.png"
          className="mt-12 rounded-2xl shadow-xl mx-auto w-full max-w-4xl"
        />
      </section>

      {/* FEATURES */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
            className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">
              Experience next-gen networking with powerful tools.
            </p>
          </motion.div>
        ))}
      </section>

      {/* USE CASE */}
      {/* USE CASE 1 */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
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
            Whether you're building a startup or side project — DevHub helps you
            connect instantly.
          </p>
        </motion.div>
      </section>
      {/* USE CASE 2 */}
      <section className="max-w-6xl mx-auto px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
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
      {/* COMMUNITY */}
      <section className="bg-gray-50 py-20 text-center">
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

      {/* CTA */}
      <section className="text-center py-20 px-4">
        <h2 className="text-3xl font-bold">Ready to build your network?</h2>

        <Link
          to="/login"
          className="inline-block mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Join DevHub 🚀
        </Link>
      </section>
    </div>
  );
};

export default Landing;
