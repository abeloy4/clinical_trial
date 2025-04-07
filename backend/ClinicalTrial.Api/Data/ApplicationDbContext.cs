using Microsoft.EntityFrameworkCore;
using ClinicalTrial.Api.Models;

namespace ClinicalTrial.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Doctor> Doctors { get; set; }
    public DbSet<Trial> Trials { get; set; }
    public DbSet<Participant> Participants { get; set; }
    public DbSet<Appointment> Appointments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Configure many-to-many relationship between Doctor and Trial
        modelBuilder.Entity<Doctor>()
            .HasMany(d => d.Trials)
            .WithMany(t => t.Doctors)
            .UsingEntity(j => j.ToTable("DoctorTrials"));

        // Configure one-to-many relationship between Doctor and Participant
        modelBuilder.Entity<Participant>()
            .HasOne(p => p.Doctor)
            .WithMany(d => d.Participants)
            .HasForeignKey(p => p.DoctorId)
            .OnDelete(DeleteBehavior.Restrict);

        // Configure one-to-many relationship between Trial and Participant
        modelBuilder.Entity<Participant>()
            .HasOne(p => p.Trial)
            .WithMany(t => t.Participants)
            .HasForeignKey(p => p.TrialId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}
