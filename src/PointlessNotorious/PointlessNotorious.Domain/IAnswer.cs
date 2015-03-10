using System;
using EDE.Core.Entities;

namespace PointlessNotorious.Domain
{
    // info: is this an entity or a value object?
    public interface IAnswer : IEntity<Guid>, IText
    {
    }
}