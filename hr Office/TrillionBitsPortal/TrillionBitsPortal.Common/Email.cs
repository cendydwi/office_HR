using System;
using System.Collections.Generic;
using System.Configuration;
using System.Net;
using System.Net.Mail;

namespace TrillionBitsPortal.Common
{
    public class Email
    {
        public string _Recipient;
        public string _Subject;
        public string _Body;
        public string _Sender;
        public string _SenderName;
        public List<string> _CcList;

        public Email(string senderName, string sender, string subject, string body, string recipient)
        {
            _SenderName = senderName;
            _Sender = sender;
            _Subject = subject;
            _Body = body;
            _Recipient = recipient;
        }

        public Email(string senderName, string sender, string subject, string body)
        {
            _SenderName = senderName;
            _Sender = sender;
            _Subject = subject;
            _Body = body;
        }

        public Email(string senderName, string sender, string subject, string body, string recipient, List<string> ccList)
        {
            _SenderName = senderName;
            _Sender = sender;
            _Subject = subject;
            _Body = body;
            _Recipient = recipient;
            _CcList = ccList;
        }


        public bool SendEmail(List<string> recipients, List<string> ccList, string senderPassword)
        {
            var mail = new MailMessage();
            foreach (var recipient in recipients)
            {
                mail.To.Add(recipient);
            }
            mail.From = new MailAddress(_Sender, _SenderName);
            mail.IsBodyHtml = true;
            mail.Subject = _Subject;
            mail.Body = _Body;
            if (ccList != null)
            {
                foreach (var c in ccList)
                {
                    mail.CC.Add(c);
                }
            }

            var smtp = new SmtpClient("smtp.gmail.com", 587)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_Sender, senderPassword),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network
            };
            try
            {
                smtp.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public bool SendEmail(List<string> recipients,string senderPassword)
        {
            var mail = new MailMessage();
            foreach (var recipient in recipients)
            {
                mail.To.Add(recipient);
            }
            mail.From = new MailAddress(_Sender, _SenderName);
            mail.IsBodyHtml = true;
            mail.Subject = _Subject;
            mail.Body = _Body;
            
            var smtp = new SmtpClient("smtp.gmail.com", 587)
            {
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(_Sender, senderPassword),
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network
            };
            try
            {
                smtp.Send(mail);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

    }
}
