using System.Collections.Generic;
using System.IO;

namespace FlightSearch.Models
{
    public static class CachedSearchData
    {
        private static Dictionary<string, List<FlightOfferResponse>> cachedValues = new Dictionary<string, List<FlightOfferResponse>>();

        // Metoda za dohvaćanje vrijednosti iz Dictionary-a
        public static List<FlightOfferResponse> GetFromCachedData(string path)
        {
            if (cachedValues.TryGetValue(path, out List<FlightOfferResponse> value))
                return value;
            else 
                return null;
        }

        public static bool IsCachedDataContainsKey(string path)
        {
            return cachedValues.ContainsKey(path);
        }


        // Metoda za dodavanje vrijednosti u Dictionary
        public static void AddToCachedData(string path, List<FlightOfferResponse> value)
        {
            cachedValues[path] = value;
        }

    }
}
