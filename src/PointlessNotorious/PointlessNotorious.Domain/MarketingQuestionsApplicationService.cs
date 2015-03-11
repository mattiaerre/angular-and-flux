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

        public IQuestion GetNext(int startFrom)
        {
            var questions = _questionRepository.FindAll().Where(e => e.IsAlreadyAnswered == false).ToList();
            if (questions.Any())
            {
                foreach (var question in questions)
                {
                    if (question.Order >= startFrom + 1)
                        return question;
                }
                return questions.First();
            }
            return new NullQuestion(string.Empty);;
        }

        public void Answer(IQuestion question)
        {
            _questionRepository.Update(question);
        }
    }
}
