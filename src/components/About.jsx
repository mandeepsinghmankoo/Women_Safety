import React from 'react';

function About() {
    return (
        <>
            <div className="container flex flex-row gap-10 px-10">

                <div className="image w-full md:w-1/2 grid place-items-center mt-20 opacity-80">
                    <img
                        className="shadow-xl"
                        style={{ boxShadow: "10px 10px 10px #B5A980" }}
                        src="need.png"
                        alt="Why We Need This?"
                    />
                </div>

                <div className="content w-full md:w-1/2 mt-10 md:mt-28 ">

                    <div className="relative group ">
                        <h1 className="text-4xl font-bold text-[#914722] pb-4 mt-8">
                            Why This Tech Matters ??
                        </h1>

                        <span className="absolute bottom-0 left-2 w-1/5 h-2 bg-[#394f6e] rounded-xl transition-all duration-500 ease-in-out group-hover:w-1/3"></span>
                    </div>

                    <p className="text-lg mt-3 text-[#ffffff]">
                        There is a growing concern for women's safety in urban areas due to the increase in crimes against women.
                        Public spaces often lack adequate monitoring, making it difficult to ensure their safety.
                        Current safety measures tend to be reactive rather than proactive, revealing a clear need for advanced solutions
                        to address these concerns and close the gap in prevention.
                    </p>
                </div>
            </div>

            <div className="section2 flex items-start mt-20 ml-10">

                <div className="vertical-line w-2 bg-[#B5A980] h-[1000px]"></div>


                <div className="features mt-5">
                    <div className="feature mb-8 flex gap-4">
                        <div className="horiz w-40 h-1 bg-[#B5A980] mb-2"></div>
                        <div className='w-1/2 text-white'>
                            <h2 className="text-2xl font-bold text-[#914722]">Gender Detection</h2>
                            <p>Real-time detection of individuals and gender using video streams or images involves using computer vision techniques with deep learning models like YOLO and OpenCV for accurate analysis.</p>
                        </div>
                    </div>
                    <div className="feature mb-8 flex gap-4">
                        <div className="horiz w-80 h-1 bg-[#B5A980] mb-2"></div>
                        <div className='w-1/2 text-white'>
                            <h2 className="text-2xl font-bold text-[#394f6e]"> SOS Gesture Detection</h2>
                            <p>Recognizes distress gestures like hand signals or specific movements in real-time using AI, and automatically sends alerts to emergency contacts or law enforcement for immediate emergency assistance.</p>
                        </div>
                    </div>
                    <div className="feature mb-8 flex gap-4">
                        <div className="horiz w-1/3 h-1 bg-[#B5A980] mb-2"></div>
                        <div className='w-1/2 text-white'>
                            <h2 className="text-2xl font-bold text-[#914722]">Lone Women Detection</h2>
                            <p>Detects a woman alone in vulnerable or isolated areas, especially during nighttime, using real-time monitoring. It triggers safety protocols or alerts for enhanced protection and immediate assistance.</p>
                        </div>
                    </div>
                    <div className="feature mb-8 flex gap-4">
                        <div className="horiz w-1/2 h-1 bg-[#B5A980] mb-2"></div>
                        <div className='w-1/2 text-white'>
                            <h2 className="text-2xl font-bold text-[#394f6e]">Gender Detection</h2>
                            <p>Real-time detection of individuals and gender using video streams or images involves using computer vision techniques with deep learning models like YOLO and OpenCV for accurate analysis.</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    );
}

export default About;
