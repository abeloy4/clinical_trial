// DTOs/ParticipantDTO.cs
public class ParticipantDTO
{
    public int Id { get; set; }
    public string FullName { get; set; } = string.Empty;
    public DateTime DateOfBirth { get; set; }
    public string Gender { get; set; } = string.Empty;
    public string MedicalHistory { get; set; } = string.Empty;
    public int TrialId { get; set; }
}

