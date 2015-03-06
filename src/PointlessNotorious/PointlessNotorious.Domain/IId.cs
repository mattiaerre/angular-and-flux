namespace PointlessNotorious.Domain
{
    public interface IId<out T>
    {
        T Id { get; }
    }
}