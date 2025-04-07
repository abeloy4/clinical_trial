using System.ComponentModel.DataAnnotations;

namespace ClinicalTrial.Api.Models;

public class Trial
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;          // <-- Required
    public string Description { get; set; } = string.Empty;   // <-- Required
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }

    // Navigation properties (optional)
    public ICollection<Doctor> Doctors { get; set; } = new List<Doctor>();
    public ICollection<Participant> Participants { get; set; } = new List<Participant>();
}

