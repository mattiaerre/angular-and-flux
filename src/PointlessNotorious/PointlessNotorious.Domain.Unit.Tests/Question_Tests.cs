using NSubstitute;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;

namespace PointlessNotorious.Domain.Unit.Tests
{
    // questions
    // 1. question widget: how to proceed to the next question when I need to select from a dropdown? shall we try to have always a [>>] button?

    [TestFixture]
    public class Question_Tests
    {
        private const string QuestionText = "Do you play football?";
        private const int TotalNumberOfQuestions = 815;

        [SetUp]
        public void Given_A_Question()
        {
        }

        // 1. type of the question
        // 1.1. single choice from dropdown
        // 1.2. yes no
        // 1.3. multiple choice from dropdown

        // 2. common info
        // 3. response
        // 4. ???

        // todo: create a question factory
        // todo: create an answer factory

        // questions
        // 1.1 what happens after skipping a question [we need to understant which q has not been answered]
        // 1.2 need to put the same "widget" somewhere in the website? [ok]
        // 1.3 missing "next" button functionality from designs [ok]
        // 1.4 how much this should be sitecoreable ??? [ok]
        // 1.5 see ???
        // 1.6 reflect live
        // 1.7 flexible number of questions
        // 1.8 city points

        [TestCase("Do you play football?", QuestionType.BooleanChoice, 1, 2)]
        [TestCase("Who is your favourite player?", QuestionType.SingleChoice, 2, 3)]
        [TestCase("What are your hobbies?", QuestionType.MultipleChoice, 3, 4)]
        public void It_Should_Have_Info(string text, QuestionType questionType, int order, int numberOfAnswers)
        {
            var answers = new List<IAnswer>();
            for (var i = 0; i < numberOfAnswers; i++)
                answers.Add(Substitute.For<IAnswer>());

            IQuestion question = new Question(Guid.NewGuid(), text, questionType, order, numberOfAnswers, answers);

            Assert.AreEqual(questionType, question.Type);
            Assert.AreEqual(text, question.Text);
            Assert.AreEqual(order, question.Order);
            Assert.AreEqual(numberOfAnswers, question.Answers.Count());
        }

        [Test]
        public void It_Can_Be_Skipped()
        {
            var guid = Guid.NewGuid();
            var question = new Question(guid, QuestionText, QuestionType.BooleanChoice, 3, TotalNumberOfQuestions, Enumerable.Empty<IAnswer>());

            question.Raise += e =>
            {
                var domainEvent = e;
                Assert.NotNull(domainEvent);
                Assert.AreEqual(typeof(QuestionSkipped), domainEvent.GetType());
                Assert.That(((QuestionSkipped)domainEvent).Message.Contains(guid.ToString()));
            };

            question.Skip();
        }

        [Test]
        public void It_Can_Be_Answered()
        {
            var answer = Substitute.For<IAnswer>();
            var guid = Guid.NewGuid();
            var question = new Question(guid, QuestionText, QuestionType.BooleanChoice, 3, TotalNumberOfQuestions, new List<IAnswer> { answer });

            question.Raise += e =>
            {
                var domainEvent = e;
                Assert.NotNull(domainEvent);
                Assert.AreEqual(typeof(QuestionAnswered), domainEvent.GetType());
                Assert.That(((QuestionAnswered)domainEvent).Message.Contains(guid.ToString()));
                Assert.AreEqual(answer, question.TheAnswer);
                Assert.IsTrue(question.IsAlreadyAnswered);
            };

            question.Answer(answer);
        }
    }
}