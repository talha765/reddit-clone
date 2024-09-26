import React from 'react';
import NavBar from '../Components/NavBar'; // Adjust the import path as needed
import Sidebar from '../Components/sidebar'; // Adjust the import path as needed

const AboutUsPage = () => {
    return (
        <div className="flex flex-col bg-gray-100">
            <div className="flex flex-1">

                <main className="flex-1 mt-10 p-8 bg-gray-800 text-white">
                    <h1 className="text-4xl font-bold mb-6">About Us</h1>
                    <p className="mb-6 leading-relaxed text-lg">
                        Student Research Lab is a platform (to link workplaces and classrooms) which provide opportunity for students to get rewarded for their educational excellence.
                        Solutions that can produce great results. Student’s creativity/innovation without experience can get them recognized while at school.
                    </p>
                    <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                    <p className="mb-6 leading-relaxed text-lg">
                    Our mission is to empower students before they enter workforce and get businesses to work with this untapped resource.
                    We are committed to delivering exceptional value through our expertise, creativity, and edication to excellence.
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
                    <h2 className="mt-5 text-3xl font-semibold mb-4">Contact Us</h2>
                    <p>214-3485 Rebecca Street <br />
                        Oakville<br />
                        Phone: +1 416 786 0802<br />
                        Email: khaqan77@yahoo.com</p>
                </main>
            </div>
        </div>
    );
};

export default AboutUsPage;
