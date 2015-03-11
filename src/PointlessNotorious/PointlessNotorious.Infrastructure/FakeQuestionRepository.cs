using System.Globalization;
using PointlessNotorious.Domain;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PointlessNotorious.Infrastructure
{
    public class FakeQuestionRepository : IQuestionRepository
    {
        private static IEnumerable<IQuestion> _data;
        private IEnumerable<IQuestion> Data
        {
            get { return _data ?? (_data = MakeData()); }
        }

        private static IEnumerable<IQuestion> MakeData()
        {
            const int total = 6;

            var videoGames = new Answer(Guid.NewGuid(), "Video games");

            var numberOfChildren = new List<IAnswer>();
            for (var i = 0; i <= 10; i++)
                numberOfChildren.Add(new Answer(Guid.NewGuid(), i.ToString(CultureInfo.InvariantCulture)));

            var hobbies = new Question(Guid.NewGuid(), "What are your hobbies?", QuestionType.MultipleChoice, 4, total,
                new List<IAnswer>
                {
                    new Answer(Guid.NewGuid(), "Health & fitness"),
                    new Answer(Guid.NewGuid(), "Holidays"),
                    videoGames,
                    new Answer(Guid.NewGuid(), "Movies")
                });

            return new List<IQuestion>
            {
                new Question(Guid.NewGuid(), "Who is your favourite player?", QuestionType.SingleChoice, 1, total,
                    new List<IAnswer> { new Answer(Guid.NewGuid(), "Joe Hart"), new Answer(Guid.NewGuid(), "Vincent Kompany"), new Answer(Guid.NewGuid(), "Yaya Toure"), new Answer(Guid.NewGuid(), "Sergio Aguero") }),
                new Question(Guid.NewGuid(), "Do you play football?", QuestionType.BooleanChoice, 2, total,
                    new List<IAnswer> { new Answer(Guid.NewGuid(), "Yes"), new Answer(Guid.NewGuid(), "No") }),
                new Question(Guid.NewGuid(), "Where would you like to travel?", QuestionType.SingleChoice, 3, total,
                    new List<IAnswer> { new Answer(Guid.NewGuid(), "Abu Dhabi"), new Answer(Guid.NewGuid(), "London"), new Answer(Guid.NewGuid(), "New York"), new Answer(Guid.NewGuid(), "Melbourne") }),
                hobbies,
                new Question(Guid.NewGuid(), "Do you have children under the age of 16?", QuestionType.SingleChoice, 5, total, numberOfChildren),
                new Question(Guid.NewGuid(), "What is your profession?", QuestionType.SingleChoice, 6, total,
                    new List<IAnswer> { new Answer(Guid.NewGuid(), "Other"), new Answer(Guid.NewGuid(), "Education"), new Answer(Guid.NewGuid(), "Engineering & manufacturing"), new Answer(Guid.NewGuid(), "Retail") }),
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
