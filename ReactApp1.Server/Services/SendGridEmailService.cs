namespace ReactApp1.Server.Services
{
    using Microsoft.Extensions.Options;
    using SendGrid;
    using SendGrid.Helpers.Mail;
    using System.Net.Mail;

    public interface IEmailService
    {
        Task SendEmailAsync(string toEmail, string subject, string message);
    }

    public class SendGridEmailService : IEmailService
    {
        private readonly SendGridSettings _settings;

        public SendGridEmailService(IOptions<SendGridSettings> settings)
        {
            _settings = settings.Value;
        }

        public async Task SendEmailAsync(string toEmail, string subject, string message)
        {
            var client = new SendGridClient(_settings.ApiKey);
            var from = new EmailAddress(_settings.SenderEmail, _settings.SenderName);
            var to = new EmailAddress(toEmail);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, message, null);
            var response = await client.SendEmailAsync(msg);

            if (!response.IsSuccessStatusCode)
            {
                var errorBody = await response.Body.ReadAsStringAsync();
                throw new Exception($"Greška prilikom slanja mejla: {response.StatusCode} - {errorBody}");
            }
        }
    }
}