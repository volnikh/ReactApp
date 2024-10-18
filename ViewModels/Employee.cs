
public class EmployeeVM
{
    public int? Id { get; set; }
    public required string FirstName { get; set; }
    public required string LastName { get; set; }
    public string? Patronymic { get; set; }
    public DateTime BirthDate { get; set; }
    public required string Email { get; set; }
    public required decimal Salary { get; set; }
    public DateTime? LastModifyDate { get; set; }
}