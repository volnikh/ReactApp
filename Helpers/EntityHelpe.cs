using DAO.Entities;

public static class EntityHelper
{
    public static Employee ToDto(this EmployeeVM vm)
    {
        return new Employee
        {
            Id = vm.Id ?? 0,
            FirstName = vm.FirstName,
            LastName = vm.LastName,
            Patronymic = vm.Patronymic,
            BirthDate = vm.BirthDate,
            Email = vm.Email,
            Salary = vm.Salary,
            LastModifyDate = DateTime.Now
        };
    }

    public static EmployeeVM ToVm(this Employee dto)
    {
        return new EmployeeVM
        {
            Id = dto.Id,
            FirstName = dto.FirstName,
            LastName = dto.LastName,
            Patronymic = dto.Patronymic,
            BirthDate = dto.BirthDate,
            Email = dto.Email,
            Salary = dto.Salary,
            LastModifyDate = dto.LastModifyDate
        };
    }
}