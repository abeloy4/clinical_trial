using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClinicalTrial.Api.Data;
using ClinicalTrial.Api.Models;
using ClinicalTrial.Api.DTOs;

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
    public async Task<ActionResult<IEnumerable<AppointmentViewDTO>>> GetAppointments()
    {
        var appointments = await _context.Appointments
            .Include(a => a.Participant)
            .Include(a => a.Doctor)
            .Include(a => a.Trial)
            .Select(a => new AppointmentViewDTO
            {
                Id = a.Id,
                AppointmentDate = a.AppointmentDate,
                AppointmentTime = a.AppointmentTime,
                Notes = a.Notes,
                Status = a.Status,
                ParticipantId = a.ParticipantId,
                ParticipantName = a.Participant.FullName,
                DoctorId = a.DoctorId,
                DoctorName = a.Doctor.FullName,
                TrialId = a.TrialId,
                TrialName = a.Trial.Name
            })
            .ToListAsync();

        return appointments;
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

    [HttpPost]
    public async Task<ActionResult<AppointmentDTO>> PostAppointment([FromBody] AppointmentDTO appointmentDTO)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var appointment = new Appointment
        {
            AppointmentDate = appointmentDTO.AppointmentDate,
            AppointmentTime = appointmentDTO.AppointmentTime,
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
