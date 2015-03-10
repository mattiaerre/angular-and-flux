using System;
using Castle.MicroKernel.Registration;
using Castle.Windsor;
using Castle.Windsor.Installer;
using PointlessNotorious.Domain;
using System.Web;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using PointlessNotorious.Infrastructure;
using PointlessNotorious.Web.Plumbing;

namespace PointlessNotorious.Web
{
    public class WebApiApplication : HttpApplication
    {
        // see: https://mattiaerre.visualstudio.com/DefaultCollection/_git/XWL#path=%2Fsrc%2FBWL%2FBWL.Web%2FGlobal.asax.cs&version=GBmaster&_a=contents

        private static IWindsorContainer _container;

        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            BootstrapContainer();
        }

        private static void BootstrapContainer()
        {
            _container = new WindsorContainer().Install(FromAssembly.This());

            GlobalConfiguration.Configuration.Services.Replace(typeof(IHttpControllerActivator), new WindsorCompositionRoot(_container));

            _container.Register(Component.For<IMarketingQuestionsApplicationService>().ImplementedBy<MarketingQuestionsApplicationService>());
            _container.Register(Component.For<IQuestionRepository>().ImplementedBy<FakeQuestionRepository>());
        }

        protected void Application_End()
        {
            _container.Dispose();
        }
    }
}
