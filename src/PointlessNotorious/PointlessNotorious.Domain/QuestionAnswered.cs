using System;
using EDE.Core.Events;

namespace PointlessNotorious.Domain
{
    public class QuestionAnswered : DomainEvent
    {
        private readonly Guid _id;

        public QuestionAnswered(Guid id)
        {
            _id = id;
        }

        public override string Message
        {
            get { return string.Format("the question w/ id: {0} has been answered", _id); }
        }
    }
}