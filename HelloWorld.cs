using DotNetify;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Bogus;
using Microsoft.Extensions.Logging;

namespace signalr_webserver
{
    public class HelloWorld : BaseVM
    {
        private Timer _timer;
        public string Greetings => "Hello World!";
        public DateTime ServerTime => DateTime.Now;

        public List<Bogus.Person> Contacts
        {
            get;set;
        }

        public HelloWorld(ILogger<HelloWorld> logger)
        {
            Contacts = Enumerable.Range(0, 10).Select(_ => new Person()).ToList();
            _timer = new Timer(state =>
            {
                Contacts = Enumerable.Range(0, 10).Select(_ => new Person()).ToList();
                Changed(nameof(Contacts));
                Changed(nameof(ServerTime));
                PushUpdates();
            }, null, 0, 1000);
        }

        public override void Dispose() => _timer.Dispose();
    }
}
