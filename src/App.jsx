import React, { useState, useEffect } from 'react';
import { Navbar, AboutUs, Services, OurServices, Managers, Subcribe, Footer, Expierence, Login, HeroNew } from './sections';
import { Loader, ScrollToTopButton } from './components';
import { ces, Loginbg } from './assets/images';
import { Hero, CoreValueV2, ServicesV2, Contact, AboutV2 } from './sectionsv2';
import { narrative } from './assets/icons';


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
                        {/* <Login /> */}
                        <Navbar />
                        <section className='bg-darkColor'>
                            <Hero />
                        </section>
                        <section className="bg-gradient-to-b  from-darkColor via-blue-200 to-white ">
                            <AboutV2 />
                        </section>
                        <section className="bg-white" style={{
                            backgroundImage: `url(${narrative})`,
                            backgroundSize: 'contain',
                            backgroundAttachment: 'fixed', // Ensures full width across the screen
                            backgroundRepeat: 'repeat',
                            backgroundPosition: 'center',
                        }}>
                            <Services />
                        </section>
                        <section >
                            <CoreValueV2 className='bg-darkColor' />
                        </section>

                        <section className="">
                            <ServicesV2 />
                        </section>
                        <section >
                            <Expierence />
                        </section>
                        <section className="padding-x">
                            <Contact />
                        </section>
                        <section className="padding-x bg-slate-950 sm:py-32 py-16 w-full">
                            <Footer />
                        </section>
                        <ScrollToTopButton />
                    </main>
                </>
            )}
        </main>
    )
}

export default App;
