import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import bapsLogo from "@assets/Baps_logo.svg_1751892626225.png";

export default function Support() {
  const supportTeam = [
    {
      name: "Anssh Prajapati",
      email: "ansshbprajapati@gmail.com",
      phone: "6892542065"
    },
    {
      name: "Pujan Patel", 
      email: "pujanp018@gmail.com",
      phone: "4703042121"
    },
    {
      name: "Shail Patel",
      email: "shail08patel@gmail.com", 
      phone: "3025624836"
    }
  ];

  return (
    <div className="min-h-screen gradient-app-bg font-primary flex flex-col">
      {/* Header */}
      <header className="glass-nav shadow-divine sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 flex items-center justify-center">
                <img src={bapsLogo} alt="BAPS Logo" className="w-16 h-16 object-contain drop-shadow-lg" />
              </div>
              <div>
                <h1 className="text-3xl font-primary font-bold text-gradient-divine tracking-tight drop-shadow-lg">
                  BAPS Mandir
                </h1>
                <p className="text-sm font-body text-gray-600 tracking-wide drop-shadow-sm">Support</p>
              </div>
            </div>
            <Link to="/">
              <Button className="button-modern gradient-ethereal text-white px-4 py-2 text-sm rounded-lg shadow-card hover:shadow-mystical transition-all font-semibold">
                <ArrowLeft className="mr-1.5 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-primary font-bold text-gradient mb-6 leading-tight tracking-tight drop-shadow-lg">
              Get Support
            </h1>
            <p className="text-xl text-gray-600 font-body max-w-3xl mx-auto leading-relaxed drop-shadow-sm">
              Need help finding a temple or have questions about our locator? 
              Our dedicated support team is here to assist you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportTeam.map((member, index) => (
              <div key={index} className="card-floating shadow-ethereal interactive-lift animate-slide-up">
                <div className="p-8">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-display font-bold text-gradient-divine mb-2 drop-shadow-md">
                      {member.name}
                    </h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                      <Mail className="text-purple-500 flex-shrink-0" size={24} />
                      <a 
                        href={`mailto:${member.email}`}
                        className="text-gray-700 font-body hover:text-purple-600 transition-all hover:underline"
                      >
                        {member.email}
                      </a>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone className="text-purple-500 flex-shrink-0" size={24} />
                      <a 
                        href={`tel:${member.phone}`}
                        className="text-gray-700 font-body hover:text-purple-600 transition-all hover:underline"
                      >
                        {member.phone}
                      </a>
                    </div>
                    <div className="pt-4">
                      <Button 
                        className="button-modern gradient-mystical text-white w-full py-4 text-lg font-semibold rounded-xl shadow-card hover:shadow-mystical transition-all"
                        onClick={() => window.open(`mailto:${member.email}`, '_blank')}
                      >
                        Contact via Email
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>

          <div className="mt-16 text-center">
            <div className="card-floating shadow-ethereal p-12 gradient-twilight">
              <h3 className="text-3xl font-display font-bold text-gradient-divine mb-8 drop-shadow-lg">
                Frequently Asked Questions
              </h3>
              <div className="text-left space-y-8 max-w-3xl mx-auto">
                <div className="backdrop-blur-sm bg-white/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">How do I search for temples?</h4>
                  <p className="text-gray-700 font-body text-lg leading-relaxed">
                    You can search by entering your zip code or using your current location. 
                    Results are sorted by distance from your location.
                  </p>
                </div>
                <div className="backdrop-blur-sm bg-white/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Temple information not accurate?</h4>
                  <p className="text-gray-700 font-body text-lg leading-relaxed">
                    Please contact our support team with the temple details and corrections needed. 
                    We'll update the information promptly.
                  </p>
                </div>
                <div className="backdrop-blur-sm bg-white/30 rounded-lg p-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-3">Location access issues?</h4>
                  <p className="text-gray-700 font-body text-lg leading-relaxed">
                    Make sure your browser allows location access for this site. 
                    Alternatively, you can search using your zip code.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="gradient-celestial border-t border-white/20 mt-auto shadow-divine backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-14 h-14 flex items-center justify-center">
                <img src={bapsLogo} alt="BAPS Logo" className="w-14 h-14 object-contain drop-shadow-lg" />
              </div>
              <span className="text-2xl font-primary font-light text-gradient tracking-tight">
                BAPS
              </span>
            </div>
            <p className="font-body text-gray-600">
              &copy; 2025 BAPS. All rights reserved. | Built with respect for spiritual traditions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}