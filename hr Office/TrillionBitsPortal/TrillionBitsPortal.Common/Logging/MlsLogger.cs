using System;

namespace TrillionBitsPortal.Common
{

    public sealed class MlsLogger : ILogger
    {
        private readonly log4net.ILog log = null;
        private static readonly Lazy<MlsLogger> lazy =
            new Lazy<MlsLogger>(() => new MlsLogger());

        public static MlsLogger Instance { get { return lazy.Value; } }

        private MlsLogger()
        {
            log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);            
        }

         
        public void Log(Exception exception)
        {
            log.Error(exception);
        }

        public void Log(string message)
        {
            log.Info(message);
        }

        public void LogException(Exception exception)
        {
            log.Error(exception);
        }

        public void LogException(Exception exception, string additionalMessage)
        {
            log.Error(additionalMessage, exception);
        }

        public void LogMessage(string message)
        {
            log.Info(message);
        }

    }
}
