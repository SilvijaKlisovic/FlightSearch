using FlightSearch.Models;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Net.Http.Headers;
using System.Web;

namespace FlightSearch.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SearchLowCostFlightsController : ControllerBase
    {
        private readonly AmadeusSettings _amadeusSettings;

        public SearchLowCostFlightsController(IOptions<AmadeusSettings> amadeusSettings)
        {
            _amadeusSettings = amadeusSettings.Value;
        }


        private async Task<string> GetAccessToken()
        {
            using (var client = new HttpClient())
            {
                var tokenResponse = await client.PostAsync("https://test.api.amadeus.com/v1/security/oauth2/token", new FormUrlEncodedContent(new[]
                {
                    new KeyValuePair<string, string>("grant_type", "client_credentials"),
                    new KeyValuePair<string, string>("client_id", _amadeusSettings.ClientId),
                    new KeyValuePair<string, string>("client_secret", _amadeusSettings.ClientSecret)
                }));

                tokenResponse.EnsureSuccessStatusCode();

                var responseBody = await tokenResponse.Content.ReadAsStringAsync();
                var tokenData = JsonConvert.DeserializeObject<TokenResponse>(responseBody);
                return tokenData.AccessToken;
            }
        }

        public static string ObjectToQueryString(object obj)
        {
            var properties = from p in obj.GetType().GetProperties()
                             let value = p.GetValue(obj, null)
                             where value != null && !string.IsNullOrEmpty(value.ToString())
                             select p.Name + "=" + HttpUtility.UrlEncode(value.ToString());

            return string.Join("&", properties);
        }

        [HttpPost]
        public async Task<IActionResult> GetSearchLowCostFlights([FromBody] SearchParams SearchParamsObject)
        {
            string QS = ObjectToQueryString(SearchParamsObject);
            List<FlightOfferResponse> cachedData = CachedSearchData.GetFromCachedData(QS);

            if (cachedData != null)
            {
                return Ok(cachedData);
            }
            else
            {
                var accessToken = await GetAccessToken();
                var flights = await GetDataFromAPI(QS, accessToken);
                return Ok(flights);
            }
        }

        private async Task<List<FlightOfferResponse>> GetDataFromAPI(string QS, string accessToken)
        {
            HttpClient _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            // primjer poziva API-ja sa TESTa:
            //string URL0 = "https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2024-10-01&adults=1";
            string URL = "https://test.api.amadeus.com/v2/shopping/flight-offers?" + QS;

            var response = await _httpClient.GetAsync(URL);

            // Empty list - bug override
            if (!response.IsSuccessStatusCode)
            {
                return new List<FlightOfferResponse>(); 
            }

            var responseBody = await response.Content.ReadAsStringAsync();
            ListFlightOfferResponseAndMeta flightOffersResponse = JsonConvert.DeserializeObject<ListFlightOfferResponseAndMeta>(responseBody);

            List<FlightOfferResponse> DataForGridView = flightOffersResponse.Data;

            if (!CachedSearchData.IsCachedDataContainsKey(QS))
            {
                CachedSearchData.AddToCachedData(QS, DataForGridView);
            }

            return DataForGridView;
        }
    }
}