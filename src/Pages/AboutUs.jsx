import React from 'react';

const AboutUsPage = () => {
    return (
        <div className="flex flex-col bg-gray-800 text-white p-10 h-screen"> {/* Add h-screen to make it full height */}
            <div className="flex-flex mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8"> {/* Added flex-1 here */}
                {/* About Us Section */}
                <section className="bg-gray-900 p-6 rounded-lg">
                    <h1 className="text-3xl font-semibold mb-4">About Us</h1>
                    <p className="text-lg leading-relaxed">
                        Student Research Lab is a platform (to link workplaces and classrooms) which provide opportunity for students to get rewarded for their educational excellence.
                        Solutions that can produce great results. Student’s creativity/innovation without experience can get them recognized while at school.
                    </p>
                </section>

                {/* Our Mission Section */}
                <section className="bg-gray-900 p-6 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
                    <p className="text-lg leading-relaxed">
                        Our mission is to empower students before they enter workforce and get businesses to work with this untapped resource. We are committed to delivering exceptional value through our expertise, creativity, and education to excellence.
                    </p>
                </section>
            </div>

            {/* Values, Contact, Get Involved */}
            <div className="flex flex mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8"> {/* Added flex-1 here */}
                {/* Our Values Section */}
                <section className="bg-gray-900 p-6 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-4">Our Values</h2>
                    <p className="text-lg leading-relaxed">
                        At Student Research Lab, we adopt a student-centric approach, focusing on understanding our student’s needs and goals. Our team employs agile methodologies and best practices to deliver high-quality solutions that drive tangible results. This research can be referred on LinkedIn. We have links to all educational research.
                    </p>
                </section>

                {/* Contact Us Section */}
                <section className="bg-gray-900 p-6 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
                    <div className="text-lg leading-relaxed">
                        <p className="mb-2">214-3485 Rebecca Street</p>
                        <p className="mb-2">Oakville</p>
                        <p className="mb-2">Phone: +1 416 786 0802</p>
                        <p className="mb-2">Email: khaqan77@yahoo.com</p>
                    </div>
                </section>

                {/* Get Involved Section */}
                <section className="bg-gray-900 p-6 rounded-lg">
                    <h2 className="text-3xl font-semibold mb-4">Get Involved</h2>
                    <p className="text-lg leading-relaxed">
                        Contact Us to promote your services, Sponsors or Advertisements (this is dummy text).
                    </p>
                </section>
            </div>
        </div>
    );
};

export default AboutUsPage;
