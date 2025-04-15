using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClinicalTrial.Api.Data;
using ClinicalTrial.Api.Models;

namespace ClinicalTrial.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AppointmentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public AppointmentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
    {
        return await _context.Appointments
            .Include(a => a.Participant)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Appointment>> GetAppointment(int id)
    {
        var appointment = await _context.Appointments
            .Include(a => a.Participant)
            .FirstOrDefaultAsync(a => a.Id == id);

        if (appointment == null)
        {
            return NotFound();
        }

        return appointment;
    }

    // [HttpPost]
    // public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
    // {
    //     _context.Appointments.Add(appointment);
    //     await _context.SaveChangesAsync();

    //     return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointment);
    // }

    [HttpPost]
    public async Task<ActionResult<AppointmentDTO>> PostAppointment(AppointmentDTO appointmentDTO)
    {
        var appointment = new Appointment
        {
            AppointmentDate = appointmentDTO.AppointmentDate,
            Notes = appointmentDTO.Notes,
            Status = appointmentDTO.Status,
            ParticipantId = appointmentDTO.ParticipantId,
            DoctorId = appointmentDTO.DoctorId,
            TrialId = appointmentDTO.TrialId
        };

        _context.Appointments.Add(appointment);
        await _context.SaveChangesAsync();

        appointmentDTO.Id = appointment.Id;

        return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointmentDTO);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> PutAppointment(int id, Appointment appointment)
    {
        if (id != appointment.Id)
        {
            return BadRequest();
        }

        _context.Entry(appointment).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!AppointmentExists(id))
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
    public async Task<IActionResult> DeleteAppointment(int id)
    {
        var appointment = await _context.Appointments.FindAsync(id);
        if (appointment == null)
        {
            return NotFound();
        }

        _context.Appointments.Remove(appointment);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool AppointmentExists(int id)
    {
        return _context.Appointments.Any(e => e.Id == id);
    }
}
