import React, { useState, useEffect } from 'react';
import { Navbar, AboutUs, Services, OurServices, Managers, Subcribe, Footer, Hero, Expierence } from './sections';
import { Loader, ScrollToTopButton } from './components';
import { ces, Loginbg } from './assets/images';


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
                    <main >
                        <Navbar />
                        <section>
                            <Hero />
                        </section>
                        <section >
                            <AboutUs />
                        </section>
                        <section className="">
                            <Services />
                        </section>
                        <section className="">
                            <OurServices />
                        </section>
                        <section >
                            <Expierence  />
                        </section>
                        <section className="padding" style={{ backgroundImage: `url(${Loginbg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
                            <Subcribe />
                        </section>
                        <section className="padding-x bg-slate-950 sm:py-32 py-16 w-full">
                            <Footer />
                        </section>
                        <ScrollToTopButton/>
                    </main>
                </>
            )}
        </main>
    )
}

export default App;
