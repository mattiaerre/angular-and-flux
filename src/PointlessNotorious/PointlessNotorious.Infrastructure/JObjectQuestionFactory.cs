using PointlessNotorious.Domain;
using System;
using System.Collections.Generic;

namespace PointlessNotorious.Infrastructure
{
    public class JObjectQuestionFactory : IQuestionFactory
    {
        private readonly dynamic _value;

        public JObjectQuestionFactory(dynamic value)
        {
            _value = value;
        }

        public IQuestion Make()
        {
            try
            {
                var question = new Question(
                    Guid.Parse(_value.Id.Value),
                    _value.Text.Value,
                    (QuestionType)((int)_value.Type.Value),
                    (int)_value.Order,
                    (int)_value.Total,
                    MakeAnswers(_value.Answers));

                if (_value.TheAnswer != null)
                    question.Answer(MakeAnswer(_value.TheAnswer));

                return question;
            }
            catch (Exception ex)
            {
                return new NullQuestion(ex.Message);
            }
        }

        private static IEnumerable<IAnswer> MakeAnswers(dynamic answers)
        {
            var list = new List<IAnswer>();
            foreach (var answer in answers)
                list.Add(MakeAnswer(answer));
            return list;
        }

        private static IAnswer MakeAnswer(dynamic answer)
        {
            return new Answer(Guid.Parse(answer.Id.Value), answer.Text.Value);
        }
    }
}
