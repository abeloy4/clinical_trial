using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClinicalTrial.Api.Data;
using ClinicalTrial.Api.Models;

namespace ClinicalTrial.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TrialsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public TrialsController(ApplicationDbContext context)
    {
        _context = context;
    }

    
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TrialDTO>>> GetTrials()
    {
        return await _context.Trials
            .Select(t => new TrialDTO
            {
                Id = t.Id,
                Name = t.Name,
                Description = t.Description,
                StartDate = t.StartDate,
                EndDate = t.EndDate
            })
            .ToListAsync();
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<TrialDTO>> GetTrial(int id)
    {
        var trial = await _context.Trials.FindAsync(id);

        if (trial == null)
        {
            return NotFound();
        }

        var trialDTO = new TrialDTO
        {
            Id = trial.Id,
            Name = trial.Name,
            Description = trial.Description,
            StartDate = trial.StartDate,
            EndDate = trial.EndDate
        };

        return trialDTO;
    }


    // POST: api/trials
    [HttpPost]
    public async Task<ActionResult<TrialDTO>> PostTrial(TrialDTO trialDTO)
    {
        var trial = new Trial
        {
            Name = trialDTO.Name,
            Description = trialDTO.Description,
            StartDate = trialDTO.StartDate,
            EndDate = trialDTO.EndDate
        };

        _context.Trials.Add(trial);
        await _context.SaveChangesAsync();

        trialDTO.Id = trial.Id;

        return CreatedAtAction(nameof(GetTrial), new { id = trial.Id }, trialDTO);
    }

// PUT: api/trials/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutTrial(int id, TrialDTO trialDTO)
    {
        if (id != trialDTO.Id)
        {
            return BadRequest();
        }

        var trial = await _context.Trials.FindAsync(id);
        if (trial == null)
        {
            return NotFound();
        }

        trial.Name = trialDTO.Name;
        trial.Description = trialDTO.Description;
        trial.StartDate = trialDTO.StartDate;
        trial.EndDate = trialDTO.EndDate;

        _context.Entry(trial).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!TrialExists(id))
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTrial(int id)
    {
        var trial = await _context.Trials
            .Include(t => t.Participants)
            .FirstOrDefaultAsync(t => t.Id == id);

        if (trial == null)
        {
            return NotFound();
        }

        if (trial.Participants.Any())
        {
            return BadRequest("Cannot delete this trial because it has participants enrolled.");
        }

        _context.Trials.Remove(trial);
        await _context.SaveChangesAsync();

        return NoContent();
    }


    private bool TrialExists(int id)
    {
        return _context.Trials.Any(e => e.Id == id);
    }
}
