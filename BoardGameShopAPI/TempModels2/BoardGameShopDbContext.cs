using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace BoardGameShopAPI.TempModels2;

public partial class BoardGameShopDbContext : DbContext
{
    public BoardGameShopDbContext()
    {
    }

    public BoardGameShopDbContext(DbContextOptions<BoardGameShopDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<BoardGame> BoardGames { get; set; }

    public virtual DbSet<Component> Components { get; set; }

    public virtual DbSet<GamePack> GamePacks { get; set; }

    public virtual DbSet<Order> Orders { get; set; }

    public virtual DbSet<OrderDetail> OrderDetails { get; set; }

    public virtual DbSet<Owner> Owners { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=MSI\\SERVER1;User ID=sa;Password=12345;Database=BoardGameShopDB;Trusted_Connection=SSPI;Encrypt=false;TrustServerCertificate=true");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<BoardGame>(entity =>
        {
            entity.ToTable("BoardGame");

            entity.Property(e => e.BoardGameId).HasMaxLength(50);
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<Component>(entity =>
        {
            entity.ToTable("Component");

            entity.Property(e => e.ComponentId).HasMaxLength(50);
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.GamePackId).HasMaxLength(50);
            entity.Property(e => e.Type).HasMaxLength(50);
            entity.Property(e => e.Image).HasMaxLength(100);

            entity.HasOne(d => d.GamePack).WithMany(p => p.Components)
                .HasForeignKey(d => d.GamePackId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_Component_GamePack");
        });

        modelBuilder.Entity<GamePack>(entity =>
        {
            entity.ToTable("GamePack");

            entity.Property(e => e.GamePackId).HasMaxLength(50);
            entity.Property(e => e.BoardGameId).HasMaxLength(50);
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.GamePackName).HasMaxLength(150);
            entity.Property(e => e.GameRule).HasColumnType("text");
            entity.Property(e => e.Image).HasMaxLength(100);
            entity.Property(e => e.Material).HasMaxLength(50);
            entity.Property(e => e.NumberOfPlayer).HasMaxLength(50);
            entity.Property(e => e.Origin).HasMaxLength(50);
            entity.Property(e => e.OwnerId).HasMaxLength(50);
            entity.Property(e => e.Size).HasMaxLength(50);

            entity.HasOne(d => d.BoardGame).WithMany(p => p.GamePacks)
                .HasForeignKey(d => d.BoardGameId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_GamePack_BoardGame");

            entity.HasOne(d => d.Owner).WithMany(p => p.GamePacks)
                .HasForeignKey(d => d.OwnerId)
                .HasConstraintName("FK_GamePack_Owner");
        });

        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("Order");

            entity.Property(e => e.OrderId).HasMaxLength(50);
            entity.Property(e => e.OrderDate).HasColumnType("datetime");
        });

        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.ToTable("OrderDetail");

            entity.Property(e => e.OrderDetailId).HasMaxLength(50);
            entity.Property(e => e.GamePackId).HasMaxLength(50);
            entity.Property(e => e.OrderId).HasMaxLength(50);

            entity.HasOne(d => d.GamePack).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.GamePackId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_OrderDetail_GamePack");

            entity.HasOne(d => d.Order).WithMany(p => p.OrderDetails)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.Cascade)
                .HasConstraintName("FK_OrderDetail_Order");
        });

        modelBuilder.Entity<Owner>(entity =>
        {
            entity.ToTable("Owner");

            entity.Property(e => e.OwnerId).HasMaxLength(50);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FullName).HasMaxLength(50);
            entity.Property(e => e.OwnerName).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
            entity.Property(e => e.Status).HasColumnType("bit");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.ToTable("Payment");

            entity.Property(e => e.PaymentId).HasMaxLength(50);
            entity.Property(e => e.Method).HasMaxLength(50);
            entity.Property(e => e.OrderId).HasMaxLength(50);
            entity.Property(e => e.PaymentDate).HasColumnType("date");
            entity.Property(e => e.State).HasMaxLength(50);
            entity.Property(e => e.UserId).HasMaxLength(50);

            entity.HasOne(d => d.Order).WithMany(p => p.Payments)
                .HasForeignKey(d => d.OrderId)
                .OnDelete(DeleteBehavior.SetNull)
                .HasConstraintName("FK_Payment_Order");

            entity.HasOne(d => d.User).WithMany(p => p.Payments)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK_Payment_User");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Role");

            entity.Property(e => e.RoleId).HasMaxLength(50);
            entity.Property(e => e.RoleName).HasMaxLength(50);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.UserId).HasMaxLength(50);
            entity.Property(e => e.Address).HasMaxLength(200);
            entity.Property(e => e.Birthday).HasColumnType("date");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.Gender)
                .HasMaxLength(10)
                .IsFixedLength();
            entity.Property(e => e.Password).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.Property(e => e.RoleId).HasMaxLength(50);
            entity.Property(e => e.SignUpDate).HasColumnType("date");
            entity.Property(e => e.Username).HasMaxLength(100);

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("FK_User_Role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
