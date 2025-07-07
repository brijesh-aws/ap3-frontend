import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Loader2 } from "lucide-react";
import { getCurrentLocation, validateZipcode } from "@/lib/geocoding";
import { useToast } from "@/hooks/use-toast";

interface SearchInterfaceProps {
  onSearch: (params: { zipcode?: string; latitude?: number; longitude?: number; city?: string; state?: string; address?: string }) => void;
  isLoading: boolean;
}

export default function SearchInterface({ onSearch, isLoading }: SearchInterfaceProps) {
  const [searchType, setSearchType] = useState<"zipcode" | "city" | "state" | "address">("zipcode");
  const [searchValue, setSearchValue] = useState("");
  const [locationLoading, setLocationLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = () => {
    if (!searchValue.trim()) {
      toast({
        title: `Please enter a ${searchType}`,
        description: `Enter a ${searchType} to find temples`,
        variant: "destructive",
      });
      return;
    }

    if (searchType === "zipcode" && !validateZipcode(searchValue)) {
      toast({
        title: "Invalid zip code",
        description: "Please enter a valid 5-digit US zip code",
        variant: "destructive",
      });
      return;
    }

    const searchParams: any = {};
    searchParams[searchType] = searchValue.trim();
    onSearch(searchParams);
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
      handleSearch();
    }
  };

  const getPlaceholder = () => {
    switch (searchType) {
      case "zipcode": return "Enter zip code (e.g., 12345)";
      case "city": return "Enter city name (e.g., Boston)";
      case "state": return "Enter state (e.g., California, CA)";
      case "address": return "Enter street address";
      default: return "Enter search term";
    }
  };

  const getInputMode = () => {
    return searchType === "zipcode" ? "numeric" : "text";
  };

  return (
    <Card className="border-gray-200">
      <CardContent className="pt-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-deep-blue mb-2" style={{ fontFamily: 'serif' }}>
            Find Your Nearest BAPS Mandir
          </h2>
          <p className="text-gray-600">
            Search by zip code, city, state, address, or use your current location
          </p>
        </div>
        
        <div className="max-w-lg mx-auto space-y-4">
          {/* Search Type Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search by:
            </label>
            <Select value={searchType} onValueChange={(value: "zipcode" | "city" | "state" | "address") => {
              setSearchType(value);
              setSearchValue("");
            }}>
              <SelectTrigger>
                <SelectValue placeholder="Select search type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="zipcode">Zip Code</SelectItem>
                <SelectItem value="city">City</SelectItem>
                <SelectItem value="state">State</SelectItem>
                <SelectItem value="address">Address</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Search Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <Input
              type="text"
              inputMode={getInputMode()}
              placeholder={getPlaceholder()}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-20 h-12 text-lg border-gray-300 focus:border-saffron focus:ring-saffron"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <Button
                onClick={handleSearch}
                disabled={isLoading}
                className="bg-saffron hover:bg-orange-600 text-white px-4 py-2 text-sm"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </div>

          {/* Location Button */}
          <div className="text-center">
            <Button
              variant="outline"
              onClick={handleLocationSearch}
              disabled={locationLoading || isLoading}
              className="border-saffron text-saffron hover:bg-saffron hover:text-white"
            >
              {locationLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Getting Location...
                </>
              ) : (
                <>
                  <MapPin className="h-4 w-4 mr-2" />
                  Use Current Location
                </>
              )}
            </Button>
          </div>

          {/* Search Examples */}
          <div className="text-center text-sm text-gray-500">
            <p>
              {searchType === "zipcode" && "Example: 12345, 90210, 10001"}
              {searchType === "city" && "Example: Boston, Atlanta, Los Angeles"}
              {searchType === "state" && "Example: California, NY, Texas"}
              {searchType === "address" && "Example: 123 Main Street"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}