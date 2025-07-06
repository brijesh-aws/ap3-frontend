import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, Loader2 } from "lucide-react";
import { getCurrentLocation, validateZipcode } from "@/lib/geocoding";
import { useToast } from "@/hooks/use-toast";

interface SearchInterfaceProps {
  onSearch: (params: { zipcode?: string; latitude?: number; longitude?: number }) => void;
  isLoading: boolean;
}

export default function SearchInterface({ onSearch, isLoading }: SearchInterfaceProps) {
  const [zipcode, setZipcode] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const { toast } = useToast();

  const handleZipcodeSearch = () => {
    if (!zipcode.trim()) {
      toast({
        title: "Please enter a zip code",
        description: "Enter your zip code to find nearby temples",
        variant: "destructive",
      });
      return;
    }

    if (!validateZipcode(zipcode)) {
      toast({
        title: "Invalid zip code",
        description: "Please enter a valid 5-digit US zip code",
        variant: "destructive",
      });
      return;
    }

    onSearch({ zipcode: zipcode.trim() });
  };

  const handleLocationSearch = async () => {
    setLocationLoading(true);
    
    try {
      const location = await getCurrentLocation();
      onSearch({ latitude: location.latitude, longitude: location.longitude });
    } catch (error) {
      toast({
        title: "Location Error",
        description: error instanceof Error ? error.message : "Unable to get your location",
        variant: "destructive",
      });
    } finally {
      setLocationLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleZipcodeSearch();
    }
  };

  return (
    <Card className="border-gray-200">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-deep-blue mb-2" style={{ fontFamily: 'serif' }}>
            Find Your Nearest BAPS Mandir
          </h2>
          <p className="text-gray-600">
            Enter your zip code or use your current location to discover temples near you
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Enter zip code (e.g., 10001)"
              value={zipcode}
              onChange={(e) => setZipcode(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 py-3 text-base focus:ring-2 focus:ring-saffron focus:border-saffron"
              disabled={isLoading}
              maxLength={5}
              autoComplete="postal-code"
            />
          </div>
          
          <div className="flex items-center justify-center mt-4 space-x-4">
            <Button
              onClick={handleZipcodeSearch}
              disabled={isLoading}
              className="bg-saffron hover:bg-orange-600 text-white px-6 py-3 font-medium touch-manipulation"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Search Temples"
              )}
            </Button>
            
            <div className="text-gray-400">or</div>
            
            <Button
              onClick={handleLocationSearch}
              disabled={isLoading || locationLoading}
              className="bg-deep-blue hover:bg-blue-700 text-white px-6 py-3 font-medium touch-manipulation"
            >
              {locationLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Location...
                </>
              ) : (
                <>
                  <MapPin className="mr-2 h-4 w-4" />
                  Use My Location
                </>
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
