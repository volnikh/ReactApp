using Microsoft.EntityFrameworkCore;
using DAO;

public static class DatabaseExtension
{
    public static IServiceCollection AddDatabaseContext(this IServiceCollection services, string connectionString)
    {
        services.AddDbContext<AppDBContext>(options =>
        {
            options.UseSqlServer(connectionString);
        });
        return services;
    }
}