using System;
using calculator.Models;

namespace calculator.Services
{
    public class QuotationService : IQuotationService
    {
        private const int FixedRate = 3;
        public decimal CalculateTotal(QuotationRequest quoteRequest)
        {
            var total = 0m;
            var ages = quoteRequest.Age.Split(',');
            var tripLengthDays = (quoteRequest.EndDate - quoteRequest.StartDate).Days + 1; // inclusive

            foreach (string age in ages) 
            {
                if (int.TryParse(age, out var result))
                {
                    total += (FixedRate * GetLoadFromAge(result) * tripLengthDays);
                }
            }

            return total;
        }

        private static decimal GetLoadFromAge(int age)
        {
            if (age >= 18 && age <= 30)
            {
                return 0.6m;
            }

            if (age >= 31 && age <= 40)
            {
                return 0.7m;
            }

            if (age >= 41 && age <= 50)
            {
                return 0.8m;
            }

            if (age >= 51 && age <= 60)
            {
                return 0.9m;
            }

            if (age >= 61 && age <= 70)
            {
                return 1;
            }

            throw new Exception("Age is not within valid range");
        }
    }
}