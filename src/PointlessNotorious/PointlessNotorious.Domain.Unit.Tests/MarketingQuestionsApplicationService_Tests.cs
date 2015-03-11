using Newtonsoft.Json.Linq;
using NSubstitute;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PointlessNotorious.Domain.Unit.Tests
{
    [TestFixture]
    public class MarketingQuestionsApplicationService_Tests
    {
        private IQuestionRepository _questionRepository;
        private IMarketingQuestionsApplicationService _service;

        [SetUp]
        public void Given_A_MarketingQuestionsApplicationService()
        {
            _questionRepository = Substitute.For<IQuestionRepository>();

            var questionOne = Substitute.For<IQuestion>();
            questionOne.Order.Returns(1);
            var questionTwo = Substitute.For<IQuestion>();
            questionTwo.Order.Returns(2);
            var questionThree = Substitute.For<IQuestion>();
            questionThree.Order.Returns(3);

            _questionRepository.FindAll().Returns(new List<IQuestion> { questionOne, questionTwo, questionThree });

            _service = new MarketingQuestionsApplicationService(_questionRepository);
        }

        [Test]
        public void It_Should_Be_Able_To_Return_A_List_Of_Questions()
        {
            var questions = _service.GetAll();

            Assert.AreEqual(3, questions.Count());
        }

        [TestCase("f60b5908-b27c-4e0a-868f-85f6a57b2088")]
        public void It_Should_Be_Able_To_Return_A_Single_Question(string id)
        {
            var guid = Guid.Parse(id);
            var question = Substitute.For<IQuestion>();
            question.Id.Returns(guid);
            _questionRepository.FindById(guid).Returns(question);

            var item = _service.GetById(Guid.Parse(id));

            Assert.AreEqual(guid, item.Id);
        }

        [Test]
        public void It_Should_Be_Able_To_Handle_A_Question_Skip()
        {
            dynamic value = new JObject();
            value.command = "question-skip";
            value.questionId = Guid.NewGuid().ToString();

            // todo !!!
        }

        [TestCase(0, 1)]
        public void It_Should_Be_Able_To_Get_Next(int startFrom, int expected)
        {
            // based on order
            // based on already answered
            // no index == get the very first one not answered (circular buffer)
            // index == get the very first one not answered (circular buffer) greater than the order passed

            var question = _service.GetNext(startFrom);

            Assert.AreEqual(expected, question.Order);
        }
    }
}
