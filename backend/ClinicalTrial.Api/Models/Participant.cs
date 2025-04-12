using System.ComponentModel.DataAnnotations;

namespace ClinicalTrial.Api.Models;

public class Participant
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    public DateTime DateOfBirth { get; set; }

    [MaxLength(20)]
    public string Gender { get; set; } = string.Empty;

    [MaxLength(200)]
    public string? MedicalHistory { get; set; }

    // Navigation properties
    public int? DoctorId { get; set; }public Doctor? Doctor { get; set; }


    public int TrialId { get; set; }
    public Trial? Trial { get; set; }

    public ICollection<Appointment> Appointments { get; set; } = new List<Appointment>();
}
