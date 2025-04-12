using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClinicalTrial.Api.Data;
using ClinicalTrial.Api.Models;

namespace ClinicalTrial.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ParticipantsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ParticipantsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<ParticipantDTO>>> GetParticipants()
    {
        return await _context.Participants
            .Select(p => new ParticipantDTO
            {
                Id = p.Id,
                FullName = p.FullName,
                DateOfBirth = p.DateOfBirth,
                Gender = p.Gender,
                MedicalHistory = p.MedicalHistory,
                TrialId = p.TrialId
            }).ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<ParticipantDTO>> GetParticipant(int id)
    {
        var p = await _context.Participants.FindAsync(id);

        if (p == null) return NotFound();

        return new ParticipantDTO
        {
            Id = p.Id,
            FullName = p.FullName,
            DateOfBirth = p.DateOfBirth,
            Gender = p.Gender,
            MedicalHistory = p.MedicalHistory,
            TrialId = p.TrialId
        };
    }


    [HttpPost]
public async Task<ActionResult<ParticipantDTO>> PostParticipant(ParticipantDTO dto)
{
    // ✅ Check if the selected TrialId exists in the database
    var trial = await _context.Trials.FindAsync(dto.TrialId)!;
    if (trial == null)
    {
        return BadRequest("Trial not found.");
    }

    var p = new Participant
    {
        FullName = dto.FullName,
        DateOfBirth = dto.DateOfBirth,
        Gender = dto.Gender,
        MedicalHistory = dto.MedicalHistory,
        TrialId = dto.TrialId
    };
    
    _context.Participants.Add(p);
    await _context.SaveChangesAsync();

    dto.Id = p.Id;
    return CreatedAtAction(nameof(GetParticipant), new { id = p.Id }, dto);
}



   [HttpPut("{id}")]
    public async Task<IActionResult> PutParticipant(int id, ParticipantDTO dto)
    {
        if (id != dto.Id) return BadRequest();

        var participant = await _context.Participants.FindAsync(id);
        if (participant == null) return NotFound();

        participant.FullName = dto.FullName;
        participant.DateOfBirth = dto.DateOfBirth;
        participant.Gender = dto.Gender;
        participant.MedicalHistory = dto.MedicalHistory;
        participant.TrialId = dto.TrialId;

        await _context.SaveChangesAsync();
        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteParticipant(int id)
    {
        var participant = await _context.Participants.FindAsync(id);
        if (participant == null)
        {
            return NotFound();
        }

        _context.Participants.Remove(participant);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool ParticipantExists(int id)
    {
        return _context.Participants.Any(e => e.Id == id);
    }
}
