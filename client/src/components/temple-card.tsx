import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Navigation, Info } from "lucide-react";
import type { TempleWithDistance } from "@shared/schema";

interface TempleCardProps {
  temple: TempleWithDistance;
  onViewDetails: (temple: TempleWithDistance) => void;
}

export default function TempleCard({ temple, onViewDetails }: TempleCardProps) {
  const handleGetDirections = () => {
    const query = encodeURIComponent(temple.address);
    const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    if (temple.phone) {
      window.location.href = `tel:${temple.phone}`;
    }
  };

  return (
    <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h4 className="text-lg font-semibold text-deep-blue">{temple.city}</h4>
              <Badge className="bg-saffron text-white">
                {temple.distance} mi
              </Badge>
            </div>
            <p className="text-gray-600 mb-3">{temple.address}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {temple.phone && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4 text-saffron" />
                  <span>{temple.phone}</span>
                </div>
              )}
              {temple.email && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4 text-saffron" />
                  <span className="truncate">{temple.email}</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGetDirections}
                className="text-saffron hover:text-orange-600 p-0"
              >
                <Navigation className="h-4 w-4 mr-1" />
                Get Directions
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onViewDetails(temple)}
                className="text-deep-blue hover:text-blue-700 p-0"
              >
                <Info className="h-4 w-4 mr-1" />
                View Details
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
