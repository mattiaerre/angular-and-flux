using System;
using System.Collections.Generic;
using EDE.Core.Entities;

namespace PointlessNotorious.Domain
{
    public interface IQuestion : IEntity<Guid>, IText, IRaise
    {
        QuestionType Type { get; }
        int Order { get; }
        int Total { get; }
        IEnumerable<IAnswer> Answers { get; }
        IAnswer TheAnswer { get; }
        bool IsAlreadyAnswered { get; }
        void Skip();
        void Answer(IAnswer answer);
    }
}