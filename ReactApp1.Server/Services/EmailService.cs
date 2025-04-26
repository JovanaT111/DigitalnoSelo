using MimeKit;
using MailKit.Net.Smtp;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

public class EmailService
{
    private readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public async Task SendEmailAsync(string email, string subject, string body)
    {
        var smtpServer = _configuration["EmailSettings:SmtpServer"];
        var port = int.Parse(_configuration["EmailSettings:Port"]);
        var username = _configuration["EmailSettings:Username"];
        var password = _configuration["EmailSettings:Password"];
        var fromEmail = _configuration["EmailSettings:FromEmail"];

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("Digitalno Selo", fromEmail));
        message.To.Add(new MailboxAddress("", email));
        message.Subject = subject;
        message.Body = new TextPart("plain") { Text = body };

        using (var client = new SmtpClient())
        {
            await client.ConnectAsync(smtpServer, port, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(username, password);
            await client.SendAsync(message);
            await client.DisconnectAsync(true);
        }
    }
}
