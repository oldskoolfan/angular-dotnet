using System;
using System.Text.Json.Serialization;

namespace calculator.Models
{
    public class QuotationResponse
    {
        [JsonPropertyName("currency_id")]
        public string CurrencyId { get; set; }
        
        [JsonPropertyName("quotation_id")]
        public Guid QuotationId { get; set; }
        
        [JsonPropertyName("total")]
        public decimal total { get; set; }
    }
}