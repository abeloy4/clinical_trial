public class AppointmentDTO
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string Location { get; set; } = string.Empty;
    public int ParticipantId { get; set; }
    public int? DoctorId { get; set; }
    public int TrialId { get; set; }
}
