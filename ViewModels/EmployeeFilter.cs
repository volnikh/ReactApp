public class EmployeeFilteer
{
    public int? Id { get; set; }
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
    public string? Patronymic { get; set; }
    public string? Email { get; set; }
    public DateTime? BirthDateFrom { get; set; }
    public DateTime? BirthDateTo { get; set; }
    public decimal? SalaryFrom { get; set; }
    public decimal? SalaryTo { get; set; }
    public string? SortBy { get; set; }
    public string? SortDirection { get; set; }
}