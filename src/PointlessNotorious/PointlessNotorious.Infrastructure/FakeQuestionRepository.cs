using System;
using System.Collections.Generic;
using PointlessNotorious.Domain;

namespace PointlessNotorious.Infrastructure
{
    public class FakeQuestionRepository : IQuestionRepository
    {
        public IEnumerable<IQuestion> FindAll()
        {
            return new List<IQuestion>
            {
                new Question(Guid.NewGuid(), "Do you play football?", QuestionType.BooleanChoice, 1, 
                    new List<IAnswer> { new Answer(Guid.NewGuid(), "Yes"), new Answer(Guid.NewGuid(), "No") }),
                new Question(Guid.NewGuid(), "Who is your favourite player?", QuestionType.SingleChoice, 2, 
                    new List<IAnswer> { new Answer(Guid.NewGuid(), "Joe Hart"), new Answer(Guid.NewGuid(), "Vincent Kompany"), new Answer(Guid.NewGuid(), "Yaya Toure"), new Answer(Guid.NewGuid(), "Sergio Aguero") }),
                new Question(Guid.NewGuid(), "What are your hobbies?", QuestionType.MultipleChoice, 3, 
                    new List<IAnswer> { new Answer(Guid.NewGuid(), "Health & fitness"), new Answer(Guid.NewGuid(), "Holidays"), new Answer(Guid.NewGuid(), "Video games"), new Answer(Guid.NewGuid(), "Movies") }),
            };
        }
    }
}
