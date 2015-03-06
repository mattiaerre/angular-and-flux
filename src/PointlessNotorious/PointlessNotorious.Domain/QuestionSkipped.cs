using System;
using EDE.Core.Events;

namespace PointlessNotorious.Domain
{
    public class QuestionSkipped : DomainEvent
    {
        private readonly Guid _id;

        public QuestionSkipped(Guid id)
        {
            _id = id;
        }

        public override string Message
        {
            get { return string.Format("the question w/ id: {0} has been skipped", _id); }
        }
    }
}