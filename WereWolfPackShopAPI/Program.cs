using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using WereWolfPackShopAPI.TempModels2;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using WereWolfPackShopAPI.Services.UserService;
using WereWolfPackShopAPI.Services.DiscountService;
using WereWolfPackShopAPI.Services.ProductService;
using WereWolfPackShopAPI.Services.ImageService;
using WereWolfPackShopAPI.Services.CharacterTypeService;
using WereWolfPackShopAPI.Services.CommentService;
using WereWolfPackShopAPI.Services.TransactionService;
using WereWolfPackShopAPI.Services.OrderService;
using WereWolfPackShopAPI.Services.OderDetailService;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

//Swagger Generator
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

builder.Services.AddAuthentication(options =>
{
    options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.SaveToken = true;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(builder.Configuration.GetSection("AppSetting:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
builder.Services.AddAuthorization();

//DB 
builder.Services.AddDbContext<WereWolfPackShopDbContext>(
    option =>
    {
        option.UseSqlServer(builder.Configuration.GetConnectionString("WereWolfPackShopDB"));
    });

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IDiscountService, DiscountService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<I_ImageService, ImageService>();
builder.Services.AddScoped<ICharacterTypeService, CharacterTypeService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<ITransactionService, TransactionService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderDetailService, OrderDetailService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment() || app.Environment.IsProduction())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCookiePolicy();

//Show useCors with CorsPolicyBuilder
app.UseCors(builder =>
{
    builder.WithOrigins("*")
    .AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader();
});

app.UseAuthorization();
app.UseAuthentication();

app.MapControllers();

app.Run();
