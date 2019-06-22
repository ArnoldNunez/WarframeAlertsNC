using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using WarframeAlertsNC.Abstract;
using WarframeAlertsNC.Models;

namespace WarframeAlertsNC
{
    public class Startup
    {
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            #region Custom Services

            // Forwarding service requests using factory methods. Only one instance 
            //of WorldStateRepositoryService will be created!
            services.AddSingleton<WorldStateRepositoryService>();
            services.AddSingleton<Microsoft.Extensions.Hosting.IHostedService>(x => x.GetRequiredService<WorldStateRepositoryService>());
            services.AddSingleton<IWorldStateRepositoryService>(x => x.GetRequiredService<WorldStateRepositoryService>());

            #endregion


            #region Microsoft Services

            services.AddMvcCore()
                .AddRazorViewEngine()
                .AddJsonFormatters();

            #endregion
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}"
                );
            });
        }
    }
}
