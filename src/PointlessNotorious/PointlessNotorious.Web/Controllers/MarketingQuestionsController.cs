using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Newtonsoft.Json;
using PointlessNotorious.Domain;
using PointlessNotorious.Infrastructure;

namespace PointlessNotorious.Web.Controllers
{
    public class MarketingQuestionsController : ApiController
    {
        private readonly IQuestionRepository<Guid> _repository;

        public MarketingQuestionsController()
            : this(new FakeQuestionRepository())
        {
        }

        public MarketingQuestionsController(IQuestionRepository<Guid> repository)
        {
            _repository = repository;
        }

        // GET api/<controller>
        public IEnumerable<IQuestion> Get()
        {
            return _repository.FindAll();
        }

        //// GET api/<controller>/5
        //public string Get(int id)
        //{
        //    return "value";
        //}

        //// POST api/<controller>
        //public void Post([FromBody]string value)
        //{
        //}

        public void Post([FromBody]dynamic value)
        {
            var id = Guid.Parse(value.questionId.Value);
            var question = _repository.FindById(id);

            throw new Exception(JsonConvert.SerializeObject(value));
        }

        //// PUT api/<controller>/5
        //public void Put(int id, [FromBody]string value)
        //{
        //}

        //// DELETE api/<controller>/5
        //public void Delete(int id)
        //{
        //}
    }
}