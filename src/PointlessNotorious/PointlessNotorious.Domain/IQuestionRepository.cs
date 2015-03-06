using System.Collections.Generic;

namespace PointlessNotorious.Domain
{
    public interface IQuestionRepository
    {
        IEnumerable<IQuestion> FindAll();
    }
}