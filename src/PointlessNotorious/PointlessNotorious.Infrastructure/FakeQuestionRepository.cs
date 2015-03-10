using System;
using System.Collections.Generic;
using System.Linq;
using PointlessNotorious.Domain;

namespace PointlessNotorious.Infrastructure
{
    public class FakeQuestionRepository : IQuestionRepository
    {
        private static IEnumerable<IQuestion> _data;
        private IEnumerable<IQuestion> Data
        {
            get { return _data ?? (_data = MakeData()); }
        }

        private IEnumerable<IQuestion> MakeData()
        {
            const int total = 3;

            var videoGames = new Answer(Guid.NewGuid(), "Video games");

            var hobbies = new Question(Guid.NewGuid(), "What are your hobbies?", QuestionType.MultipleChoice, 3, total,
                new List<IAnswer>
                {
                    new Answer(Guid.NewGuid(), "Health & fitness"),
                    new Answer(Guid.NewGuid(), "Holidays"),
                    videoGames,
                    new Answer(Guid.NewGuid(), "Movies")
                });

            return new List<IQuestion>
            {
                new Question(Guid.NewGuid(), "Do you play football?", QuestionType.BooleanChoice, 1, total,
                    new List<IAnswer> { new Answer(Guid.NewGuid(), "Yes"), new Answer(Guid.NewGuid(), "No") }),
                new Question(Guid.NewGuid(), "Who is your favourite player?", QuestionType.SingleChoice, 2, total,
                    new List<IAnswer> { new Answer(Guid.NewGuid(), "Joe Hart"), new Answer(Guid.NewGuid(), "Vincent Kompany"), new Answer(Guid.NewGuid(), "Yaya Toure"), new Answer(Guid.NewGuid(), "Sergio Aguero") }),
                hobbies,
            };
        }

        public IEnumerable<IQuestion> FindAll()
        {
            return Data;
        }

        public IQuestion FindById(Guid id)
        {
            return Data.FirstOrDefault(e => e.Id == id);
        }

        public void Update(IQuestion question)
        {
            var item = Data.FirstOrDefault(e => e.Id == question.Id);
            item.Answer(question.TheAnswer);
        }
    }
}
