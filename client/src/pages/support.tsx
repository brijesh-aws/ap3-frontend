import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import bapsLogo from "@assets/image_1751840390730.png";

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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={bapsLogo} alt="BAPS Logo" className="w-10 h-10 object-contain" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-deep-blue" style={{ fontFamily: 'serif' }}>
                  BAPS Mandir
                </h1>
                <p className="text-sm text-gray-600">Support</p>
              </div>
            </div>
            <Link to="/">
              <Button variant="outline" className="flex items-center space-x-2">
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-deep-blue mb-4">
            Get Support
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Need help finding a temple or have questions about our locator? 
            Our dedicated support team is here to assist you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportTeam.map((member, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <CardTitle className="text-xl text-deep-blue text-center">
                  {member.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-saffron" size={20} />
                  <a 
                    href={`mailto:${member.email}`}
                    className="text-gray-700 hover:text-deep-blue transition-colors text-sm"
                  >
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="text-saffron" size={20} />
                  <a 
                    href={`tel:${member.phone}`}
                    className="text-gray-700 hover:text-deep-blue transition-colors text-sm"
                  >
                    {member.phone}
                  </a>
                </div>
                <div className="pt-2">
                  <Button 
                    className="w-full bg-saffron hover:bg-orange-600 text-white"
                    onClick={() => window.open(`mailto:${member.email}`, '_blank')}
                  >
                    Contact via Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-8">
              <h3 className="text-lg font-semibold text-deep-blue mb-4">
                Frequently Asked Questions
              </h3>
              <div className="text-left space-y-4 max-w-2xl mx-auto">
                <div>
                  <h4 className="font-medium text-deep-blue mb-2">How do I search for temples?</h4>
                  <p className="text-gray-600 text-sm">
                    You can search by entering your zip code or using your current location. 
                    Results are sorted by distance from your location.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-deep-blue mb-2">Temple information not accurate?</h4>
                  <p className="text-gray-600 text-sm">
                    Please contact our support team with the temple details and corrections needed. 
                    We'll update the information promptly.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-deep-blue mb-2">Location access issues?</h4>
                  <p className="text-gray-600 text-sm">
                    Make sure your browser allows location access for this site. 
                    Alternatively, you can search using your zip code.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 flex items-center justify-center">
                <img src={bapsLogo} alt="BAPS Logo" className="w-8 h-8 object-contain" />
              </div>
              <span className="text-lg font-bold text-deep-blue" style={{ fontFamily: 'serif' }}>
                BAPS
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              &copy; 2024 BAPS. All rights reserved. | Built with respect for spiritual traditions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}