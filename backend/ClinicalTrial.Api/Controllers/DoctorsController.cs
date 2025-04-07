using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ClinicalTrial.Api.Data;
using ClinicalTrial.Api.Models;

namespace ClinicalTrial.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DoctorsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DoctorsController(ApplicationDbContext context)
    {
        _context = context;
    }

   [HttpGet]
    public async Task<ActionResult<IEnumerable<DoctorDTO>>> GetDoctors()
    {
        var doctors = await _context.Doctors
            .Select(d => new DoctorDTO
            {
                Id = d.Id,
                FullName = d.FullName,
                Specialization = d.Specialization
            })
            .ToListAsync();

        return Ok(doctors);
    }


   [HttpGet("{id}")]
    public async Task<ActionResult<DoctorDTO>> GetDoctor(int id)
    {
        var doctor = await _context.Doctors.FindAsync(id);

        if (doctor == null)
            return NotFound();

        var dto = new DoctorDTO
        {
            Id = doctor.Id,
            FullName = doctor.FullName,
            Specialization = doctor.Specialization
        };

        return Ok(dto);
    }


    [HttpPost]
    public async Task<ActionResult<DoctorDTO>> PostDoctor(DoctorDTO doctorDto)
    {
        var doctor = new Doctor
        {
            FullName = doctorDto.FullName,
            Specialization = doctorDto.Specialization
        };

        _context.Doctors.Add(doctor);
        await _context.SaveChangesAsync();

        // Return DTO with the generated ID
        doctorDto.Id = doctor.Id;

        return CreatedAtAction(nameof(GetDoctor), new { id = doctor.Id }, doctorDto);
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> PutDoctor(int id, DoctorDTO doctorDto)
    {
        if (id != doctorDto.Id)
        {
            return BadRequest();
        }

        var doctor = await _context.Doctors.FindAsync(id);
        if (doctor == null)
        {
            return NotFound();
        }

        doctor.FullName = doctorDto.FullName;
        doctor.Specialization = doctorDto.Specialization;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!DoctorExists(id))
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
    public async Task<IActionResult> DeleteDoctor(int id)
    {
        var doctor = await _context.Doctors.FindAsync(id);
        if (doctor == null)
        {
            return NotFound();
        }

        _context.Doctors.Remove(doctor);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool DoctorExists(int id)
    {
        return _context.Doctors.Any(e => e.Id == id);
    }
}
