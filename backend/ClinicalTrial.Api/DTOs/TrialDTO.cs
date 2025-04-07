public class TrialDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;          // <-- Must exist
    public string Description { get; set; } = string.Empty;   // <-- Must exist
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
}
