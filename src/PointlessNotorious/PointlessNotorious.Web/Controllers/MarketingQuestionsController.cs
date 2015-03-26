using PointlessNotorious.Domain;
using PointlessNotorious.Infrastructure;
using System;
using System.Collections.Generic;
using System.Web.Http;
using System.Web.Http.Cors;

namespace PointlessNotorious.Web.Controllers
{
    // see: http://www.asp.net/web-api/overview/security/enabling-cross-origin-requests-in-web-api

    [EnableCors(origins: "http://local.mcfc.co.uk,http://local.supporters.mcfc.co.uk", headers: "*", methods: "*")]
    public class MarketingQuestionsController : ApiController
    {
        private readonly IMarketingQuestionsApplicationService _applicationService;

        public MarketingQuestionsController(IMarketingQuestionsApplicationService applicationService)
        {
            _applicationService = applicationService;
        }

        // GET api/<controller>
        public IEnumerable<IQuestion> Get()
        {
            try
            {
                return _applicationService.GetAll();
            }
            catch (Exception ex)
            {
                return new List<IQuestion> { new NullQuestion(ex.Message) };
            }
        }

        // GET api/<controller>/next
        public IQuestion Get(string command, int startFrom)
        {
            if (command == "next")
                return _applicationService.GetNext(startFrom);
            return new NullQuestion("TODO");
        }

        // POST api/<controller>
        public void Post([FromBody]dynamic value)
        {
            var factory = new JObjectQuestionFactory(value.question);
            var question = factory.Make();

            _applicationService.Answer(question);
        }
    }
}