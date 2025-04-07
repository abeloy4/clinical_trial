using System.ComponentModel.DataAnnotations;

namespace ClinicalTrial.Api.Models;

public class Appointment
{
    public int Id { get; set; }

    public DateTime AppointmentDate { get; set; }

    [MaxLength(500)]
    public string? Notes { get; set; }

    public string Status { get; set; } = "Scheduled";

    // Navigation properties
    public int ParticipantId { get; set; }
    public Participant Participant { get; set; } = null!;
}
