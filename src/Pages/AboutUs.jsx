import React from 'react';
import NavBar from '../Components/NavBar'; // Adjust the import path as needed
import Sidebar from '../Components/sidebar'; // Adjust the import path as needed

const AboutUsPage = () => {
    return (
        <div className="flex flex-col bg-gray-100">
            <NavBar />
            <div className="flex flex-1">
                <Sidebar />
                <main className="flex-1 mt-10 p-8 bg-gray-800 text-white">
                    <h1 className="text-4xl font-bold mb-6">About Us</h1>
                    <p className="mb-6 leading-relaxed text-lg">
                        Welcome to our platform! We are dedicated to providing tailored solutions for individuals with dyslexia. 
                        Our team is passionate about creating a supportive environment that empowers children to thrive.
                    </p>
                    <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                    <p className="mb-6 leading-relaxed text-lg">
                        Our mission is to develop innovative tools and resources that facilitate learning and enhance educational experiences 
                        for children with dyslexia. We strive to make a positive impact in their lives and help them achieve their full potential.
                    </p>
                    <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
                    <ul className="list-disc list-inside mb-6 text-lg">
                        <li className="mb-2">Inclusivity: We believe in creating a welcoming space for all.</li>
                        <li className="mb-2">Innovation: We embrace creativity and technology to enhance learning.</li>
                        <li className="mb-2">Empowerment: We aim to empower children and their families through education.</li>
                    </ul>
                    <h2 className="text-3xl font-semibold mb-4">Get Involved</h2>
                    <p className="leading-relaxed text-lg">
                        If you share our passion and want to get involved, we would love to hear from you! 
                        Reach out to us through our contact page or connect with us on social media.
                    </p>
                </main>
            </div>
        </div>
    );
};

export default AboutUsPage;
