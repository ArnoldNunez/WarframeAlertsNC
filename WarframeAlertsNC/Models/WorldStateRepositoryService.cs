using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using WarframeAlertsNC.Abstract;

namespace WarframeAlertsNC.Models
{
    /// <summary>
    /// Service that will fetch the warframe worldstate json in the background.
    /// </summary>
    public class WorldStateRepositoryService : HostedService, IWorldStateRepositoryService
    {
        public string WorldStateJSON { get; set; }
        private readonly HttpClient _httpClient;

        public WorldStateRepositoryService()
        {
            _httpClient = new HttpClient();
        }


        /// <summary>
        /// Fetches the worldstate from the 3rd party api.
        /// </summary>
        public async void GetWorldState()
        {
            string json;
            HttpResponseMessage response;

            response = await _httpClient.GetAsync(@"https://ws.warframestat.us/pc");
            json = await response.Content.ReadAsStringAsync();

            if (String.Compare(WorldStateJSON, json) != 0)
            {
                WorldStateJSON = json;
            }
        }

        /// <summary>
        /// Executes the async tasks.
        /// </summary>
        /// <param name="cancellationToken">Token for determining when task should be cancelled.</param>
        /// <returns></returns>
        protected override async Task ExecuteAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                GetWorldState();
                await Task.Delay(TimeSpan.FromMinutes(1.0), cancellationToken);
            }
        }
    }
}
