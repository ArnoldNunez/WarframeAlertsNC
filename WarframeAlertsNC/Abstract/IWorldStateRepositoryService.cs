using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WarframeAlertsNC.Abstract
{
    public interface IWorldStateRepositoryService : IHostedService
    {
        string WorldStateJSON { get; set; }
        void GetWorldState();
    }
}
