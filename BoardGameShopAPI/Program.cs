using BoardGameShopAPI.Services.BoardGameService;
using BoardGameShopAPI.Services.ComponentService;
using BoardGameShopAPI.Services.FirebaseCloundService;
using BoardGameShopAPI.Services.GamePackService;
using BoardGameShopAPI.Services.OrderDetailService;
using BoardGameShopAPI.Services.OrderService;
using BoardGameShopAPI.Services.OwnerService;
using BoardGameShopAPI.Services.PaymentService;
using BoardGameShopAPI.Services.UserService;
using BoardGameShopAPI.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using BoardGameShopAPI.Services.MomoService;
using ProGCoder_MomoAPI.Models.Momo;
using BoardGameShopAPI.Services.GameTagService;
using BoardGameShopAPI.Services.TagInPackService;

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

//DataBase
builder.Services.AddDbContext<BoardGameShopDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("BoardGameShopDB"));
});

builder.Services.Configure<MomoOptionModel>(builder.Configuration.GetSection("MomoAPI"));

builder.Services.AddScoped<IBoardGameService, BoardGameService>();
builder.Services.AddScoped<IComponentService, ComponentService>();
builder.Services.AddScoped<IGamePackService, GamePackService>();
builder.Services.AddScoped<IOrderDetailService, OrderDetailService>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOwnerService, OwnerService>();
builder.Services.AddScoped<IPaymentService, PaymentService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IFirebaseCloundService, FirebaseCloundService>(); 
builder.Services.AddScoped<IMomoService, MomoService>();
builder.Services.AddScoped<IGameTagService, GameTagService>();
builder.Services.AddScoped<ITagInPackService, TagInPackService>();

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
