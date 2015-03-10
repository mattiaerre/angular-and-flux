using System;
using System.Collections.Generic;

namespace PointlessNotorious.Domain
{
    public interface IQuestionRepository
    {
        IEnumerable<IQuestion> FindAll();
        IQuestion FindById(Guid id);
        void Update(IQuestion question);
    }
}