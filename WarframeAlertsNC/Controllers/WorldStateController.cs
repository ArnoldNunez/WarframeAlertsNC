using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WarframeAlertsNC.Abstract;
using WarframeAlertsNC.Models;

namespace WarframeAlertsNC.Controllers
{
    public class WorldStateController : Controller
    {
        public WorldStateController()
        {

        }

        /// <summary>
        /// Controller action for retrieving the worldstate Json through the worldstate repository.
        /// </summary>
        /// <param name="worldStateRepoService">Dependency Injected worldstate repo service.</param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult State([FromServices] IWorldStateRepositoryService worldStateRepoService)
        {
            if (worldStateRepoService.WorldStateJSON == null)
            {
                return Json(new EmptyResult());
            }

            return Content(worldStateRepoService.WorldStateJSON);
        }
    }
}