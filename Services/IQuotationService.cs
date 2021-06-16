using calculator.Models;

namespace calculator.Services
{
    public interface IQuotationService
    {
        public decimal CalculateTotal(QuotationRequest quoteRequest);
    }
}