using System;
using System.Collections.Generic;
using EDE.Core.Entities;

namespace PointlessNotorious.Domain
{
    public interface IQuestion : IId<Guid>, IText, IRaise
    {
        QuestionType Type { get; }
        int Order { get; }
        IEnumerable<IAnswer> Answers { get; }
        void Skip();
    }
}