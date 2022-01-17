
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class Expenses
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Title { get; set; }
        public double Amount { get; set; }
        public string Date{ get; set; }
       

    }
}
