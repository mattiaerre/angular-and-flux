using System;
using System.Collections.Generic;

namespace PointlessNotorious.Domain
{
    public class Question : IQuestion
    {
        public Guid Id { get; private set; }
        public string Text { get; private set; }
        public QuestionType QuestionType { get; private set; }
        public int Order { get; private set; }
        public IEnumerable<IAnswer> Answers { get; private set; }

        public Question(Guid id, string text, QuestionType questionType, int order, IEnumerable<IAnswer> answers)
        {
            Id = id;
            Text = text;
            QuestionType = questionType;
            Order = order;
            Answers = answers;
        }

    }
}