import React, { useState, useEffect } from 'react';
import { Navbar, AboutUs, Services, OurServices, Managers, Subcribe, Footer, Hero, Expierence,MapTutorial } from './sections';
import { Loader } from './components';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading process
        setTimeout(() => {
          setIsLoading(false);
        }, 3000); // Adjust the time as needed
    }, []);

    return (
        <main className="relative">
            {isLoading ? (
                <Loader />
            ) : (
                <>
                    <Navbar />
                    <section>
                        <Hero />
                    </section>
                    <section className="padding">
                        <AboutUs />
                    </section>
                    <section className="">
                        <Services />
                    </section>
                    <section className="">
                        <OurServices />
                    </section>
                    <section className="padding">
                        <Expierence />
                    </section>
                    <section className="padding-x sm:py-32 py-16 w-full">
                        <Subcribe />
                    </section>
                    <section className="padding-x bg-slate-950 sm:py-32 py-16 w-full">
                        <Footer />
                    </section>
                </>
            )}
        </main>
    )
}

export default App;
