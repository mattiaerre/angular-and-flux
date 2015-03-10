using System;
using System.Collections.Generic;
using EDE.Core.Events;

namespace PointlessNotorious.Domain
{
    public class Question : IQuestion
    {
        public Guid Id { get; private set; }
        public string Text { get; private set; }
        public QuestionType Type { get; private set; }
        public int Order { get; private set; }
        public int Total { get; private set; }
        public IEnumerable<IAnswer> Answers { get; private set; }
        public IAnswer TheAnswer { get; private set; }
        public bool IsAlreadyAnswered
        {
            get { return TheAnswer != null; }
        }

        public Question(Guid id, string text, QuestionType type, int order, int total, IEnumerable<IAnswer> answers)
        {
            Id = id;
            Text = text;
            Type = type;
            Order = order;
            Total = total;
            Answers = answers;
            Raise += e => { };
        }

        public void Skip()
        {
            Raise(new QuestionSkipped(Id));
        }

        public event Action<IDomainEvent> Raise;

        public void Answer(IAnswer answer)
        {
            TheAnswer = answer;
            Raise(new QuestionAnswered(Id));
        }
    }
}