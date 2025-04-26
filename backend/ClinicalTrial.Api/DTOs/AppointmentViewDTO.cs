namespace ClinicalTrial.Api.DTOs;

public class AppointmentViewDTO
{
    public int Id { get; set; }
    public DateTime AppointmentDate { get; set; }
    public string AppointmentTime { get; set; } = string.Empty;
    public string? Notes { get; set; }
    public string Status { get; set; }

    public int ParticipantId { get; set; }
    public string ParticipantName { get; set; } = string.Empty;

    public int DoctorId { get; set; }
    public string DoctorName { get; set; } = string.Empty;

    public int TrialId { get; set; }
    public string TrialName { get; set; } = string.Empty;
}
