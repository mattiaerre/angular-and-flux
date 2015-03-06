using System;
using System.Collections.Generic;

namespace PointlessNotorious.Domain
{
    public interface IQuestion : IId<Guid>, IText
    {
        QuestionType QuestionType { get; }
        int Order { get; }
        IEnumerable<IAnswer> Answers { get; }
    }
}