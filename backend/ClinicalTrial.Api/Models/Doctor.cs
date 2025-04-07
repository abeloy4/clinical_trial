using System.ComponentModel.DataAnnotations;

namespace ClinicalTrial.Api.Models;

public class Doctor
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Specialization { get; set; } = string.Empty;

    // Navigation properties
    public ICollection<Trial> Trials { get; set; } = new List<Trial>();
    public ICollection<Participant> Participants { get; set; } = new List<Participant>();
}
