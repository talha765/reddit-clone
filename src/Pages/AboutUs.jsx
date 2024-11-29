import React, { useState } from 'react';
import axios from "axios";
const api_route = import.meta.env.VITE_API_URL_CONTENT;

const AboutUsPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
        feedback: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission
    
        const { name, email, phone, feedback } = formData;
    
        axios.post(`${api_route}/contact`, { name, email, phone, feedback })
            .then((response) => {
                alert(response.data.message || 'Form submitted successfully!');
                // Optionally, reset the form here
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    feedback: '',
                });
            })
            .catch((error) => {
                console.error('Error sending form data:', error);
                alert('Failed to send the form data.');
            });
    };

    return (
        <div className="flex flex-col bg-gray-800 text-black p-10  mt-12"> {/* Add h-screen to make it full height */}
            <div className="flex-flex mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* Added flex-1 here */}
                {/* About Us Section */}
                <section className="bg-slate-50 p-6 rounded-lg">
                    <h1 className="text-3xl font-semibold mb-4">About Us</h1>
                    <p className="text-lg leading-relaxed">
                        Student Research Lab is a platform (to link workplaces and classrooms) which provide opportunity for students to get rewarded for their educational excellence.
                        Solutions that can produce great results. Student’s creativity/innovation without experience can get them recognized while at school.
                    </p>
                </section>

                {/* Our Mission Section */}
                <section className="bg-slate-50 p-6 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-lg leading-relaxed">
                        Our mission is to empower students before they enter the workforce and get businesses to work with this untapped resource. We are committed to delivering exceptional value through our expertise, creativity, and education to excellence.
                    </p>
                </section>
            </div>

            {/* Values, Contact, Get Involved */}
            <div className="flex flex mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8"> {/* Added flex-1 here */}
                {/* Our Values Section */}
                <section className="bg-slate-50 p-6 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
                    <p className="text-lg leading-relaxed">
                        At Student Research Lab, we adopt a student-centric approach, focusing on understanding our students’ needs and goals. Our team employs agile methodologies and best practices to deliver high-quality solutions that drive tangible results. This research can be referred on LinkedIn. We have links to all educational research.
                    </p>
                </section>

                {/* Contact Us Section */}
                <section className="bg-slate-50 p-6 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
                    <div className="text-lg leading-relaxed">
                        <p className="mb-2">214-3485 Rebecca Street</p>
                        <p className="mb-2">Oakville</p>
                        <p className="mb-2">Phone: +1 416 786 0802</p>
                        <p className="mb-2 text-xs md:text-sm">Email: studentresearchlabhome@gmail.com</p>
                    </div>
                </section>

                {/* Get Involved Section */}
                <section className="bg-slate-50 p-6 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-4">Get Involved</h2>
                    <p className="text-lg leading-relaxed">
                        Contact Us to promote your services, Sponsors or Advertisements .
                    </p>
                </section>
            </div>

                    {/* Contact Us Form */}
                    <div className="mt-10">
                        <h2 className="text-3xl font-semibold mb-4 text-white">Contact Us</h2>
                        <form className="bg-gray-700 p-6 rounded-lg mb-10" onSubmit={handleSubmit}>
                        <div className="mb-4">
                    <label htmlFor="name" className="block text-lg mb-2 text-white">Full Name:</label>
                    <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange} 
                        className="w-full p-2 rounded bg-slate-50 text-black"
                required
            />
                    </div>

                    
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-lg mb-2 text-white">Email:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            className="w-full p-2 rounded bg-slate-5- text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-lg mb-2 text-white">Phone:</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            className="w-full p-2 rounded bg-slate-50 text-black"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="feedback" className="block text-lg mb-2 text-white">Feedback:</label>
                        <textarea 
                            id="feedback" 
                            name="feedback" 
                            value={formData.feedback} 
                            onChange={handleInputChange} 
                            className="w-full p-2 rounded bg-slate-50 text-black"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button 
                        type="submit" 
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AboutUsPage;
