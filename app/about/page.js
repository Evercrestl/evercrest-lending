import Navbar from '@/components/Navbar';
import { CheckCircle } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar />
      <section className="py-20 bg-gray-50 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="https://public.youware.com/users-website-assets/prod/0060604d-563e-4b70-9f2f-5525f45b31de/c6d11673c2f54d2a9c9b4532128016a4.jpg" 
                alt="Business handshake" 
                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Committed to Your Financial Success</h2>
              <p className="text-lg text-gray-600 mb-6">
                At Evercrest Lending, we believe that financial freedom should be accessible to everyone. Founded in 2010, we have helped over 50,000 families and businesses achieve their goals.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                Our team of financial experts works tirelessly to find the best loan solutions for your unique situation. We don't just lend money; we build lasting partnerships.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="text-brand-blue mr-3" size={24} />
                  <span className="text-gray-800 font-medium">Transparent terms with no hidden fees</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-brand-blue mr-3" size={24} />
                  <span className="text-gray-800 font-medium">Personalized loan options</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="text-brand-blue mr-3" size={24} />
                  <span className="text-gray-800 font-medium">24/7 Customer support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
