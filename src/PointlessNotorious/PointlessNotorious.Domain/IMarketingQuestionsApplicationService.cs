using System;
using System.Collections.Generic;

namespace PointlessNotorious.Domain
{
    public interface IMarketingQuestionsApplicationService
    {
        IEnumerable<IQuestion> GetAll();
        IQuestion GetById(Guid id);
        IQuestion GetNext(int startFrom);
        void Answer(IQuestion question);
    }
}