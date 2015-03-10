using System;
using System.Collections.Generic;
using System.Linq;

namespace PointlessNotorious.Domain
{
    public class MarketingQuestionsApplicationService : IMarketingQuestionsApplicationService
    {
        private readonly IQuestionRepository _questionRepository;

        public MarketingQuestionsApplicationService(IQuestionRepository questionRepository)
        {
            _questionRepository = questionRepository;
        }

        public IEnumerable<IQuestion> GetAll()
        {
            return _questionRepository.FindAll();
        }

        public IQuestion GetById(Guid id)
        {
            return _questionRepository.FindById(id);
        }

        public IQuestion GetNext()
        {
            var next = _questionRepository.FindAll().OrderBy(e => e.Order).FirstOrDefault(e => e.IsAlreadyAnswered == false);
            return next ?? new NullQuestion(string.Empty);
        }

        public void Answer(IQuestion question)
        {
            _questionRepository.Update(question);
        }
    }
}
