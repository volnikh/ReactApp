using Microsoft.EntityFrameworkCore;
using DAO.Entities;

namespace DAO
{
    public class AppDBContext : DbContext
    {
        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
            
        }

        public DbSet<Employee> Employees { get; set; }
    }
}