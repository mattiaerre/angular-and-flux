using System.Collections.Generic;

namespace PointlessNotorious.Domain
{
    public interface IQuestionRepository<in T>
    {
        IEnumerable<IQuestion> FindAll();
        IQuestion FindById(T id);
    }
}