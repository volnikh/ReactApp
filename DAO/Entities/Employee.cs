
using System.ComponentModel.DataAnnotations.Schema;

namespace DAO.Entities
{
    [Table("Employee")]
    public class Employee
    {
        [Column("ID")]
        public int Id { get; set; }

        [Column("first_name")]
        public required string FirstName { get; set; }

        [Column("last_name")]
        public required string LastName { get; set; }

        [Column("patronymic")]
        public string? Patronymic { get; set; }

        [Column("birth_date")]
        public required DateTime BirthDate { get; set; }

        [Column("email")]
        public required string Email { get; set; }

        [Column("salary")]
        public required decimal Salary { get; set; }
        
        [Column("last_modify_date")]
        public required DateTime LastModifyDate { get; set; }
    }
}