using PointlessNotorious.Domain;
using PointlessNotorious.Infrastructure;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace PointlessNotorious.Web.Controllers
{
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

        //// GET api/<controller>/071b719a-3a53-4322-9e2b-56651386186a
        //public IQuestion Get(string id)
        //{
        //    try
        //    {
        //        return _applicationService.GetById(Guid.Parse(id));
        //    }
        //    catch (Exception ex)
        //    {
        //        return new NullQuestion(ex.Message);
        //    }
        //}

        // GET api/<controller>/next
        public IQuestion Get(string command)
        {
            if (command == "next")
                return _applicationService.GetNext();
            return new NullQuestion("TODO");
        }

        // todo: change from void into a response data object
        // POST api/<controller>
        public void Post([FromBody]dynamic value)
        {
            //Thread.Sleep(1500);

            //var question = JsonConvert.DeserializeObject<Question>(value);

            var factory = new JObjectQuestionFactory(value.question);
            var question = factory.Make();

            _applicationService.Answer(question);

            //try
            //{

            //    var id = Guid.Parse(value.questionId.Value);
            //    //var question = _repository.FindById(id);

            //    // todo !!!
            //}
            //catch (Exception ex)
            //{
            //    // todo !!!
            //}
        }
    }
}