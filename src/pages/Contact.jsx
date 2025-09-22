import React from "react";
import a0 from '../assets/60.jpg';


const Contact = () => {
 const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    name: e.target.name.value,
    email: e.target.email.value,
    phone: e.target.phone.value,
    message: e.target.message.value, // this stores the message
  };

  try {
    const response = await fetch("http://localhost:8000/api/enquiry/submit/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      alert("Enquiry submitted successfully!");
      e.target.reset();
    } else {
      const errorData = await response.json();
      console.error("Error:", errorData);
      alert("Failed to submit enquiry.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("An error occurred. Try again.");
  }
};


  return (
    <div className="bg-white font-inter">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Main Content */}
        <div className="mt-12 flex flex-col md:flex-row gap-8 items-start">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <h3 className="text-xl font-semibold mt-6 mb-2">For Online Orders</h3>
            <p className="text-gray-700">Inquiry/Complaint</p>
            <p className="text-gray-700">9976357250</p>
            <h3 className="text-xl font-semibold mt-4 mb-2">Any other queries</h3>
            <p className="text-gray-700">9976357250</p>
            <p className="text-gray-700">9976357350</p>
            <p className="text-gray-700">10 AM - 7:00 PM</p>
            <p className="text-gray-700 mt-4">
              Email:{" "}
              <a href="mailto:customercarestepup.in@gmail.com" className="text-blue-500 hover:underline">
                customercarestepup.in@gmail.com
              </a>
            </p>
          </div>

          <div className="md:w-1/2">
            <img
              src={a0}
              alt="Contact Us"
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Enquiry Form</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" placeholder="Enter your name"
                className="mt-1 block w-full rounded-md shadow-sm border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-600" required />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter your email"
                  className="mt-1 block w-full rounded-md shadow-sm border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-600" required />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                <input type="tel" id="phone" name="phone" placeholder="Enter your phone number"
                  className="mt-1 block w-full rounded-md shadow-sm border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-600" required />
              </div>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows="4" placeholder="Enter your message here"
                className="mt-1 block w-full rounded-md shadow-sm border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-gray-600" required></textarea>
            </div>

            <div className="flex justify-center">
              <button type="submit"
                className="px-6 py-3 bg-gray-800 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition-colors">
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
