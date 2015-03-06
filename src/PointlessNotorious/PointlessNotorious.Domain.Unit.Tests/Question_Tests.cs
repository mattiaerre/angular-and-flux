using System;
using System.Linq;
using NSubstitute;
using NUnit.Framework;
using System.Collections.Generic;

namespace PointlessNotorious.Domain.Unit.Tests
{
    // questions
    // 1. question widget: how to proceed to the next question when I need to select from a dropdown? shall we try to have always a [>>] button?

    [TestFixture]
    public class Question_Tests
    {
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

        [TestCase("Do you play football?", QuestionType.BooleanChoice, 1, 2)]
        [TestCase("Who is your favourite player?", QuestionType.SingleChoice, 2, 3)]
        [TestCase("What are your hobbies?", QuestionType.MultipleChoice, 3, 4)]
        public void It_Should_Have_A_Type(string text, QuestionType questionType, int order, int numberOfAnswers)
        {
            var answers = new List<IAnswer>();
            for (var i = 0; i < numberOfAnswers; i++)
                answers.Add(Substitute.For<IAnswer>());

            IQuestion question = new Question(Guid.NewGuid(), text, questionType, order, answers);

            Assert.AreEqual(questionType, question.QuestionType);
            Assert.AreEqual(text, question.Text);
            Assert.AreEqual(order, question.Order);
            Assert.AreEqual(numberOfAnswers, question.Answers.Count());
        }
    }
}