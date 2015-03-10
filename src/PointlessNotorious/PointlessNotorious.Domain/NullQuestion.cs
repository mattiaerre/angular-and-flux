using System;
using System.Collections.Generic;
using System.Linq;
using EDE.Core.Events;

namespace PointlessNotorious.Domain
{
    public class NullQuestion : IQuestion
    {
        public Guid Id
        {
            get { return Guid.Empty; }
        }

        public string Text { get; private set; }

        public event Action<IDomainEvent> Raise;

        public QuestionType Type
        {
            get { return QuestionType.Unknown; }
        }

        public int Order
        {
            get { return 0; }
        }

        public int Total
        {
            get { return 0; }
        }

        public IEnumerable<IAnswer> Answers
        {
            get { return Enumerable.Empty<IAnswer>(); }
        }

        public IAnswer TheAnswer
        {
            get { return null; } // todo: create a null answer
        }

        public bool IsAlreadyAnswered
        {
            get { return false; }
        }

        public void Skip()
        {
        }

        public void Answer(IAnswer answer)
        {
        }

        public NullQuestion(string text)
        {
            Text = text;
        }
    }
}