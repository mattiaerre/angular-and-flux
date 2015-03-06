using System;

namespace PointlessNotorious.Domain
{
    public class Answer : IAnswer
    {
        public Answer(Guid id, string text)
        {
            Id = id;
            Text = text;
        }

        public Guid Id { get; private set; }
        public string Text { get; private set; }
    }
}