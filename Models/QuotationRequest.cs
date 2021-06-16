using System;
using System.Text.Json.Serialization;

namespace calculator.Models
{
    public class QuotationRequest
    {
        [JsonPropertyName("age")]
        public string Age { get; set; }
        
        [JsonPropertyName("currency_id")]
        public string CurrencyId { get; set; }
        
        [JsonPropertyName("start_date")]
        public DateTime StartDate { get; set; }
        
        [JsonPropertyName("end_date")]
        public DateTime EndDate { get; set; }
    }
}